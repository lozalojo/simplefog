import { SimpleFogLayer } from "../classes/SimpleFogLayer.js";

if (!CONFIG.simplefog) CONFIG.simplefog = {};
if (!window.simplefog) window.simplefog = {};

Hooks.on("ready", function() {
})

Hooks.once("canvasInit", (canvas) => {
});

Hooks.once("canvasInit", (canvas) => {
    canvas.simplefog = canvas.stage.addChildAt(new SimpleFogLayer(canvas), 14);
});

Hooks.on("canvasInit", (canvas) => {
    canvas.simplefog.canvasInit();
});

Hooks.on("canvasReady", (_) => {
});

/**
 * React to changes to current scene
 */
Hooks.on("updateScene", (scene, data, options) => {
    console.log(scene);
    if(scene.data._view) return;
    // React to visibility change
    if (hasProperty(data, "flags.simplefog.visible")) {
        canvas.simplefog.visible = data.flags.simplefog.visible;
    }

    // React to composite history change
    if (hasProperty(data, "flags.simplefog.blurRadius")) {
        canvas.simplefog.setBlurRadius(data.flags.simplefog.blurRadius);
    }
    // React to composite history change
    if (hasProperty(data, "flags.simplefog.blurQuality")) {
        canvas.simplefog.setBlurQuality(data.flags.simplefog.blurQuality);
    }

    // React to composite history change
    if (hasProperty(data, "flags.simplefog.history")) {
        canvas.simplefog.renderStack(data.flags.simplefog.history);
    }

    // React to alpha/tint changes
    if (!game.user.isGM && hasProperty(data, "flags.simplefog.playerAlpha")) {
        canvas.simplefog.setAlpha(data.flags.simplefog.playerAlpha);
        canvas.simplefog.renderStack();
    }
    if (game.user.isGM && hasProperty(data, "flags.simplefog.gmAlpha")) {
        canvas.simplefog.setAlpha(data.flags.simplefog.gmAlpha);
        canvas.simplefog.renderStack();
    }
    if (!game.user.isGM && hasProperty(data, "flags.simplefog.playerTint")) canvas.simplefog.setTint(data.flags.simplefog.playerTint);
    if (game.user.isGM && hasProperty(data, "flags.simplefog.gmTint")) canvas.simplefog.setTint(data.flags.simplefog.gmTint);
});
