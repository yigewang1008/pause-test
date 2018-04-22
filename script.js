
AFRAME.registerShader('my-custom', {
  // The schema declares any parameters for the shader.
  schema: {
    // Where relevant, it is customary to support color.
    // The A-Frame schema uses `type:'color'`, so it will parse string values like 'white' or 'red.
    // `is:'uniform'` tells A-Frame this should appear as uniform value in the shader(s).
    color: {type:'color', is:'uniform', default:'red'},
    // It is customary to support opacity, for fading in and out.
    opacity: {type:'number', is:'uniform', default:1.0}
  },

  // Setting raw to true uses THREE.RawShaderMaterial instead of ShaderMaterial,
  // so your shader strings are used as-is, for advanced shader usage.
  // Here, we want the usual prefixes with GLSL constants etc.,
  // so we set it to false.
  // (Which is also the default, so we could have omitted it).
  raw: false,

  // Here, we're going to use the default vertex shader by omitting vertexShader.
  // But note that if your fragment shader cares about texture coordinates,
  // the vertex shader should set varying values to use in the fragment shader.

  // Since almost every WebVR-capable browser supports ES6,
  // define our fragment shader as a multi-line string.
  fragmentShader:
`
  // Use medium precision.
  precision mediump float;

  // This receives the color value from the schema, which becomes a vec3 in the shader.
  uniform vec3 color;

  // This receives the opacity value from the schema, which becomes a number.
  uniform float opacity;

  // This is the shader program.
  // A fragment shader can set the color via gl_FragColor,
  // or decline to draw anything via discard.
  void main () {
    // Note that this shader doesn't use texture coordinates.
    // Set the RGB portion to our color,
    // and the alpha portion to our opacity.
    gl_FragColor = vec4(color, opacity);
  }
`
});
