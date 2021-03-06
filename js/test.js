requestText("resources/directory.json", function(text)
{
	var canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.tabIndex = 0;
	document.body.appendChild(canvas);
	var game = window.root = new Game({ element: canvas, directory: JSON.parse(text) });
	Object.entries(game.directory.controls).forEach(function(entry)
	{
		if(!entry[1].filters)
			entry[1].filters = { };
		if(!entry[1].controllers)
			entry[1].controllers = { };
		var name = entry[0];
		var func = new Function(entry[1].function).call(game);
		var type = entry[1].type;
		var mouseControllerFilter = new Function(entry[1].filters.mouse).call(game);
		var keyboardControllerFilter = new Function(entry[1].filters.keyboard).call(game);
		var gamepadControllerFilter = new Function(entry[1].filters.gamepad).call(game);
		var mouseControllers = entry[1].controllers.mouse || [ ];
		var keyboardControllers = entry[1].controllers.keyboard || [ ];
		var gamepadControllers = entry[1].controllers.gamepad || [ ];
		game.level.controls.addControl(name, func, type, mouseControllerFilter, keyboardControllerFilter, gamepadControllerFilter, mouseControllers, keyboardControllers, gamepadControllers);
	});
	game.renderer.textureMap.loadTextures([ "resources/textures/earth.png" ], function onTexturesReady(textures)
	{
		var geometry = game.level.addGeometry("sphere", [ 0, 0, -6 ], [ 0, 0, 0 ], textures[0], [ 1, 1, 1 ]);
		var lasttime = Date.now();
		setInterval(function()
		{
			var now = Date.now();
			game.level.geometries[0].rotation.y += Math.PI / 3000 * (now - lasttime);
			lasttime = now;
		}, 1000 / 60);
	});
});
