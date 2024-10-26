$(document).ready(function() {
    const cancelSettingsButton = $("#cancelSettingsButton");
    const saveSettingsButton = $("#saveSettingsButton");
    const goToSettingsButton = $("#goToSettingsButton");
    const welcomeWindow = $("#welcomeWindow");
    const settingsWindow = $("#settingsWindow");

    goToSettingsButton.click(function() {
        showSettings(welcomeWindow, settingsWindow);
    });

    cancelSettingsButton.click(function() {
        hideSettings(welcomeWindow, settingsWindow);
    });

    saveSettingsButton.click(function() {
        hideSettings(welcomeWindow, settingsWindow);
    });
});

function showSettings(welcomeWindow, settingsWindow) {
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

function hideSettings(welcomeWindow, settingsWindow) {
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
    }, 1620);
}