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
            'onStateChange': handlePlayerStateChange // Added state change listener
        }
    });
    playerReference = new YT.Player('player-reference', {
        events: { 'onReady': checkPlayersReady }
    });
}

function checkPlayersReady(event) {
    if (event.target.getIframe().id === 'player-final') finalReady = true;
    if (event.target.getIframe().id === 'player-reference') refReady = true;

    if (finalReady && refReady) {
        if (syncBtn) syncBtn.disabled = false;
        if (btnSpinner) btnSpinner.classList.add('d-none');
        resetSyncButton(); // Initialize button text
    }
}

// Automatically reset button text when the video finishes
function handlePlayerStateChange(event) {
    // YT.PlayerState.ENDED (or 0) means the video has finished playing
    if (event.data === YT.PlayerState.ENDED) {
        resetSyncButton();
    }
}

// Helper function to set button back to "Play" state
function resetSyncButton() {
    if (btnText) {
        btnText.innerHTML = '<i class="fa-solid fa-play text-success me-1"></i> Sync Play Both';
    }
}

// Master playback toggle structure
if (syncBtn) {
    syncBtn.addEventListener('click', function() {
        var finalState = playerFinal.getPlayerState();
        var refState = playerReference.getPlayerState();

        // Check if either player is currently playing (State 1 = PLAYING)
        if (finalState === 1 || refState === 1) {
            playerFinal.pauseVideo();
            playerReference.pauseVideo();
            resetSyncButton();
        } else {
            var masterTime = playerFinal.getCurrentTime() || 0;
            
            // If the video is at the end, reset timeline to 0 before playing again
            if (finalState === 0) {
                masterTime = 0;
            }

            playerFinal.seekTo(masterTime, true);
            playerReference.seekTo(masterTime, true);
            
            playerFinal.playVideo();
            playerReference.playVideo();
            
            if (btnText) {
                btnText.innerHTML = '<i class="fa-solid fa-pause text-warning me-1"></i> Pause Both';
            }
        }
    });
}

// Visibility listener for background tab syncing
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && playerFinal && playerReference) {
        var finalState = playerFinal.getPlayerState();
        var currentMasterTime = playerFinal.getCurrentTime() || 0;
        
        // CASE 1: Final video is still actively playing in the background
        if (finalState === 1) {
            playerReference.seekTo(currentMasterTime, true);
            playerReference.playVideo();
        } 
        // CASE 2: Final video finished while you were away, but reference video is dragging behind
        else if (finalState === 0 || finalState === 2) { 

            playerReference.pauseVideo();
            playerReference.seekTo(currentMasterTime, true);
            
            resetSyncButton();
        }
    }
});