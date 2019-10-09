/*
	krpano WebGL Post-Processing Plugin - Drone Attack Hit Effect
	1.20
*/

var krpanoplugin = function()
{
	var local  = this;

	// internal plugin information
	local.name    = "Drone Attack Hit Effect";
	local.version = "1.20";

	var krpano = null;
	var plugin = null;

	// xml attributes
	var xml_effect = 0.0;
	var xml_order  = "";
	var xml_phase  = 2;

	// internals
	var STATE_need_shader_update    = false;
	var STATE_shader_order_changed  = false;
	var STATE_shader_added          = false;


	// krpano WebGL pixel shaders
	var shader = null;


	
	function effect_shader_src()
	{
		return ""+ 
		"precision mediump float;"+
		"uniform sampler2D sm;"+
		"varying vec2 tx;"+
		"uniform float effect;"+
		"void main()"+
		"{"+
			"vec2 s=vec2(effect,0.0);"+
			"float r=texture2D(sm,tx-s).r*(1.0+effect*10.0);"+
			"float g=texture2D(sm,tx).g*(1.0-effect*10.0);"+
			"float b=texture2D(sm,tx+s).b*(1.0+effect*10.0);"+
			"gl_FragColor=vec4(r,g,b,1.0);"+
		"}";
	}
	


	// plugin entry point
	local.registerplugin = function(krpanointerface, pluginpath, pluginobject)
	{
		krpano = krpanointerface;
		plugin = pluginobject;

		if (krpano.version < "1.20" || krpano.build < "2019-01-01")
		{
			krpano.trace(3, local.name+" - too old krpano version (min. 1.20)");
			return;
		}

		// check for WebGL support
		if (krpano.webGL)
		{
			shader = krpano.webGL.createPostProcessingShader(effect_shader_src(), "effect", "pp_hit_effect");
			
			if (!shader)
			{
				// shader error...
				local.unloadplugin();
				return;
			}

			// add plugin attributes
			plugin.registerattribute("effect",  xml_effect,  xml_effect_set,  function(){ return xml_effect;  });
			plugin.registerattribute("order",   xml_order,   xml_order_set,   function(){ return xml_order;   });
			plugin.registerattribute("phase",   xml_phase,   xml_phase_set,   function(){ return xml_phase;   });
			
			request_shader_update();
		}
	}

	function BOOLEAN(value){ return typeof(value) === "boolean" ? value : (".yes.on.true.1.".indexOf( ("."+value+".").toLowerCase() ) >= 0); }

	function validate(value, type, oldvalue, callback)
	{
		if (type == "bool")
		{
			value = BOOLEAN(value);
		}
		else if (type == "number")
		{
			value = Number(value);
			if (isNaN(value))
				return;
		}
		else if (type == "int")
		{
			value = value | 0;
		}
		else if (type == "lowstr")
		{
			value = (""+value).toLowerCase();
		}

		if (value != oldvalue)
		{
			callback(value);
		}
	}


	function xml_effect_set(v)  { validate(v, "number", xml_effect,  function(n){ xml_effect = n;  request_shader_update(); }); }
	function xml_order_set(v)   { validate(v, "lowstr", xml_order,   function(s){ xml_order = s; STATE_shader_order_changed = true; request_shader_update(); }); }
	function xml_phase_set(v)   { validate(v, "int",    xml_phase,   function(i){ xml_phase = i; STATE_shader_order_changed = true; request_shader_update(); }); }


	function request_shader_update()
	{
		if (STATE_need_shader_update == false)
		{
			STATE_need_shader_update = true;
			
			// force a redraw
			krpano.view.haschanged = true;
			
			// request an shader update in next 'tick' (and wait this way also for other potential settings changes in the current tick)
			krpano.actions.nexttick( update_shader_uniforms );
		}
	}


	function update_shader_uniforms()
	{
		var enabled = xml_effect > 0.0001;

		if (enabled)
		{
			if (STATE_shader_order_changed || STATE_shader_added == false)
			{
				remove_shaders();
				add_shaders();
				
				STATE_shader_order_changed = false;
			}
			
			// select/activate the shader for interfacing
			krpano.webGL.useShader(shader);
			krpano.webGL.context.uniform1f(shader.effect, xml_effect / 100.0 );
			
			// restore
			krpano.webGL.useShader(null);
		}
		else
		{
			remove_shaders();
		}

		// mark as updated
		STATE_need_shader_update = false;
	}


	function validate_unique_sortorder(arr, sortorder)
	{
		for (var i=0, cnt=arr.length; i < cnt; i++)
		{
			var e = arr[i];
			if ((e._sortorder|0) == sortorder)
			{
				// sortorder already in use, try next free order
				return validate_unique_sortorder(arr, sortorder + 1);
			}
		}
		
		return sortorder;
	}
	
	
	function add_shaders()
	{
		if (STATE_shader_added == false)
		{
			STATE_shader_added = true;
			
			// where to add: 1 => after pano, before hotspots, 2 => after pano and hotspots
			var targetShaderArray = xml_phase == 1 ? krpano.webGL.ppShaderArray2 : krpano.webGL.ppShaderArray;
			
			// insert sorted
			var sortorder = parseFloat(xml_order);
			if ( isNaN(sortorder) )
			{
				// no order given, add at the end
				sortorder = xml_order = 1 + targetShaderArray.length;
			}
			else
			{
				// allow only integer values as order
				sortorder |= 0;
			}
			
			// make sure the order is unique
			sortorder = xml_order = validate_unique_sortorder(targetShaderArray, sortorder);

			targetShaderArray.push(shader);

			shader._sortorder = sortorder;

			targetShaderArray.sort(shader_sort_cmp);
		}
	}


	function shader_sort_cmp(a,b)
	{
		var a_order = a._sortorder;
		var b_order = b._sortorder;

		// undefined-order is after defined-order
		if(a_order !== undefined && b_order !== undefined)
		{
			if (a_order < b_order)
				return -1;
			if (a_order > b_order)
				return + 1;
		}
		else if (a_order === undefined)
		{
			return +1;
		}
		else if (b_order === undefined)
		{
			return -1;
		}

		return 0;
	}


	function arr_remove(arr, element)
	{
		for (var i=0, cnt=arr.length; i < cnt; i++)
		{
			if (arr[i] === element)
			{
				arr.splice(i,1);
				break;
			}
		}
	}


	function remove_shaders()
	{
		if (STATE_shader_added == true)
		{
			STATE_shader_added = false;

			arr_remove(krpano.webGL.ppShaderArray, shader);
			arr_remove(krpano.webGL.ppShaderArray2, shader);
		}
	}


	function delete_shaders()
	{
		if (krpano && krpano.webGL)
		{
			if (shader)
			{
				krpano.webGL.deleteShader(shader);
				shader = null;
			}
		}
	}


	local.unloadplugin = function()
	{
		if (krpano && plugin)
		{
			remove_shaders();
			delete_shaders();

			delete plugin.enabled;

			krpano = null;
			plugin = null;
		}
	}
}
