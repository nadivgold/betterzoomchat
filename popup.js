var twitchEmotes = true;
chrome.storage.sync.get(['twitch'], function(result) {
  if(typeof result === 'boolean')
    twitchEmotes = result.twitch;
  document.getElementById('twitch').checked = twitchEmotes;
});
var bttvEmotes = true;
chrome.storage.sync.get(['bttv'], function(result) {
  if(typeof result === 'boolean')
    bttvEmotes = result.bttv;
  document.getElementById('bttv').checked = bttvEmotes;
});
var ffzEmotes = true;
chrome.storage.sync.get(['ffz'], function(result) {
  if(typeof result === 'boolean')
    ffzEmotes = result.ffz;
  document.getElementById('ffz').checked = ffzEmotes;
});
var settingsOpen = false;
var infoOpen = false;

function send(payload) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {method: `${payload}`});
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Settings Switches
  var twichToggle = document.getElementById('twitch');
  twichToggle.addEventListener('click', () => {
    twitchEmotes = !twitchEmotes;
    chrome.storage.sync.set({twitch: twitchEmotes}, function() {
      console.log('Twitch Value is set to ' + twitchEmotes);
    });
  });
  var bttvToggle = document.getElementById('bttv');
  bttvToggle.addEventListener('click', () => {
    bttvEmotes = !bttvEmotes;
    chrome.storage.sync.set({bttv: bttvEmotes}, function() {
      console.log('bttv Value is set to ' + bttvEmotes);
    });
  });
  var ffzToggle = document.getElementById('ffz');
  ffzToggle.addEventListener('click', () => {
    ffzEmotes = !ffzEmotes;
    chrome.storage.sync.set({ffz: ffzEmotes}, function() {
      console.log('ffz Value is set to ' + ffzEmotes);
    });
  });
  // Github Link
  var ghLink = document.getElementById('github');
  ghLink.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {method: `openGH`});
    });
  }, false);
  // Settings Dropdown
  var settingsDropdown = document.getElementById('set');
  settingsDropdown.addEventListener('click', () => {
    settingsOpen = !settingsOpen;
    if(settingsOpen){
      document.getElementById('settings').style.display = 'block';
      document.getElementById('info').style.display = 'block';

    } else {
      document.getElementById('settings').style.display = 'none';
      document.getElementById('info').style.display = 'none';

    }
  }, false);
  // Start Button
  //var checkButton = document.getElementById('check');
  //checkButton.addEventListener('click', () => {
    // if(twitchEmotes || bttvEmotes || ffzEmotes)
    //   send(`${ffzEmotes ? 'ffz' : ''} ${bttvEmotes ? 'bttv' : ''} ${twitchEmotes ? 'twitch' : ''}`)
    // else
    //   send('none')
  //}, false);

  // Launch Meeting Button
  var launchMeeting = document.getElementById('launchMeeting');
  launchMeeting.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {method: `launchMeeting`});
    });
    }, false);


    // Test Start and Update Script
    setInterval(() => {
      if(twitchEmotes || bttvEmotes || ffzEmotes)
        send(`${ffzEmotes ? 'ffz' : ''} ${bttvEmotes ? 'bttv' : ''} ${twitchEmotes ? 'twitch' : ''}`)
      else
        send('none')
    }, 100);
}, false);
