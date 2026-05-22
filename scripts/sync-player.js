/* jshint esversion: 6 */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerFinal, playerReference;
var finalReady = false, refReady = false;

const syncBtn = document.getElementById('sync-play-btn');
const btnSpinner = document.getElementById('sync-btn-spinner');
const btnText = document.getElementById('sync-btn-text');

function onYouTubeIframeAPIReady() {
    playerFinal = new YT.Player('player-final', {
        events: { 
            'onReady': checkPlayersReady,
            'onStateChange': handlePlayerStateChange
        }
    });
    playerReference = new YT.Player('player-reference', {
        events: { 
            'onReady': checkPlayersReady,
            'onStateChange': handlePlayerStateChange
        }
    });
}

function checkPlayersReady(event) {
    if (event.target.getIframe().id === 'player-final') finalReady = true;
    if (event.target.getIframe().id === 'player-reference') refReady = true;

    if (finalReady && refReady) {
        if (syncBtn) syncBtn.disabled = false;
        if (btnSpinner) btnSpinner.classList.add('d-none');
        updateSyncButtonState();
    }
}

// Automatically update button UI when player state changes
function handlePlayerStateChange(event) {
    updateSyncButtonState();
}

// Intelligent UI: Determines label based on actual playback state
function updateSyncButtonState() {
    if (!playerFinal || !playerReference || !btnText) return;

    var finalState = playerFinal.getPlayerState();
    var refState = playerReference.getPlayerState();

    // If both are playing, show "Pause"
    if (finalState === 1 && refState === 1) {
        btnText.innerHTML = '<i class="fa-solid fa-pause text-warning me-1"></i> Pause Both';
    } 
    // Otherwise, show "Sync Play"
    else {
        btnText.innerHTML = '<i class="fa-solid fa-play text-success me-1"></i> Sync Play Both';
    }
}

// Master playback toggle logic
if (syncBtn) {
    syncBtn.addEventListener('click', function() {
        var finalState = playerFinal.getPlayerState();
        var refState = playerReference.getPlayerState();

        if (finalState === 1 && refState === 1) {
            playerFinal.pauseVideo();
            playerReference.pauseVideo();
        } 
        else {
            var masterTime = playerFinal.getCurrentTime() || 0;
            
            // If the video is finished (0), reset to start
            if (finalState === 0) masterTime = 0;

            playerFinal.seekTo(masterTime, true);
            playerReference.seekTo(masterTime, true);
            
            playerFinal.playVideo();
            playerReference.playVideo();
        }
    });
}