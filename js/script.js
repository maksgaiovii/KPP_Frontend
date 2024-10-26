$(document).ready(function() {
    const cancelSettingsButton = $("#cancelSettingsButton");
    const saveSettingsButton = $("#saveSettingsButton");

    const mobileSaveSettingsButton = $("#mobileSaveSettingsButton");
    const mobileCancelSettingsButton = $("#mobileCancelSettingsButton");

    const goToSettingsButton = $("#goToSettingsButton");
    const welcomeWindow = $("#welcomeWindow");
    const settingsWindow = $("#settingsWindow");
    const bodyOfPage = $("#bodyOfPage");

    goToSettingsButton.click(function() {
        showSettings(welcomeWindow, settingsWindow, bodyOfPage);
    });

    cancelSettingsButton.click(function() {
        hideSettings(welcomeWindow, settingsWindow, bodyOfPage);
    });
    
    mobileCancelSettingsButton.click(function() {
        hideSettings(welcomeWindow, settingsWindow, bodyOfPage);
    });

    saveSettingsButton.click(function() {
        hideSettings(welcomeWindow, settingsWindow, bodyOfPage);
    });

    mobileSaveSettingsButton.click(function() {
        hideSettings(welcomeWindow, settingsWindow, bodyOfPage);
    });
});

function showSettings(welcomeWindow, settingsWindow, bodyOfPage) {
    bodyOfPage.removeClass('welcome-body');
    bodyOfPage.addClass('settings-body');
    
    welcomeWindow.css({
        'transform': 'scale(0.8)'
    });

    setTimeout(function() {
        welcomeWindow.css({
            'opacity': '0',
            'transform': 'scale(0.8) translateY(-50px)'
        })
    }, 400);

    setTimeout(function() {
        welcomeWindow.addClass("unvisible");
        settingsWindow.removeClass("unvisible");
    }, 800);

    setTimeout(function () {
        settingsWindow.css({
            'opacity': '1',
            'transform': 'translateY(0px) scale(0.8)'
        });
    }, 820);

    setTimeout(function() {
        settingsWindow.css({
            'transform': 'scale(1.0)'
        });
    }, 1220);
}

function hideSettings(welcomeWindow, settingsWindow, bodyOfPage) {
    settingsWindow.css({
        'transform': 'scale(0.8)'
    });

    setTimeout(function() {
        settingsWindow.css({
            'opacity': '0',
            'transform': 'scale(0.8) translateY(-50px)'
        }); 
    }, 400);

    setTimeout(function() {
        settingsWindow.addClass("unvisible");
        welcomeWindow.removeClass("unvisible");
    }, 800);

    setTimeout(function() {
        welcomeWindow.css({
            'opacity': '1',
            'transform': 'translateY(0px) scale(0.8)'
        });
    }, 1220);

    setTimeout(function() {
        welcomeWindow.css({
            'transform': 'scale(1.0)'
        });

        bodyOfPage.addClass('welcome-body');
        bodyOfPage.removeClass('settings-body');
    }, 1620);
}