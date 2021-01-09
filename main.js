const GLfloatSize = Float32Array.BYTES_PER_ELEMENT;
const GLuintSize = Uint16Array.BYTES_PER_ELEMENT;

const compileShaderProgram = async (c, v, f) => {
  var vs = await loadShader(c, c.VERTEX_SHADER, v);
  var fs = await loadShader(c, c.FRAGMENT_SHADER, f);

  var prog = c.createProgram();
  c.attachShader(prog, vs)
  c.attachShader(prog, fs)
  c.linkProgram(prog)
  return prog
};

const loadShader = async (c,st,p) => {
    const shader = c.createShader(st)
    let source = await fetch(p).then(r => r.text())
    console.log(source)
    c.shaderSource( shader, source)
    c.compileShader(shader)
    if (!c.getShaderParameter(shader, c.COMPILE_STATUS)) {
      alert(`Shader at ${p}:\n${c.getShaderInfoLog(shader)}`);
      return null;
    }
    return shader
}

const generateBuffers = (c, v, i) => {
  var VAO = c.createVertexArray();
  var VBO = c.createBuffer();
  var EBO = c.createBuffer();
  c.bindVertexArray(VAO);
  c.bindBuffer(c.ARRAY_BUFFER, VBO);
  c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, EBO);
  c.bufferData(c.ARRAY_BUFFER, new Float32Array(v), c.STATIC_DRAW);
  c.bufferData(c.ELEMENT_ARRAY_BUFFER, new Uint16Array(i), c.STATIC_DRAW);
  c.vertexAttribPointer(0, 3, c.FLOAT, false, GLfloatSize * 8, GLfloatSize * 0);
  c.enableVertexAttribArray(0);
  c.vertexAttribPointer(1, 3, c.FLOAT, false, GLfloatSize * 8, GLfloatSize * 3);
  c.enableVertexAttribArray(1);
  c.vertexAttribPointer(2, 2, c.FLOAT, false, GLfloatSize * 8, GLfloatSize * 6);
  c.enableVertexAttribArray(2);
  c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, null);
  c.bindBuffer(c.ARRAY_BUFFER, null);
  c.bindVertexArray(null);
  return [VAO, VBO, EBO];
};

const vertices = [
  //big rect
  //x     y     z      r     g     b     s     t
  //face3
  -0.5,
  -0.5,
  -0.5,
  1.0,
  1.0,
  0.0,
  0.0,
  0.0,
  0.5,
  -0.5,
  -0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  0.5,
  0.5,
  -0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
  -0.5,
  0.5,
  -0.5,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
  //face1
  -0.5,
  -0.5,
  0.5,
  1.0,
  1.0,
  0.0,
  0.0,
  0.0,
  0.5,
  -0.5,
  0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  0.5,
  0.5,
  0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
  -0.5,
  0.5,
  0.5,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
  //face4
  -0.5,
  -0.5,
  0.5,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
  -0.5,
  0.5,
  0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
  -0.5,
  0.5,
  -0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  -0.5,
  -0.5,
  -0.5,
  1.0,
  1.0,
  0.0,
  0.0,
  0.0,
  //face5
  0.5,
  -0.5,
  0.5,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
  0.5,
  0.5,
  0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
  0.5,
  0.5,
  -0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  0.5,
  -0.5,
  -0.5,
  1.0,
  1.0,
  0.0,
  0.0,
  0.0,
  //face2
  -0.5,
  -0.5,
  0.5,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
  0.5,
  -0.5,
  0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
  0.5,
  -0.5,
  -0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  -0.5,
  -0.5,
  -0.5,
  1.0,
  1.0,
  0.0,
  0.0,
  0.0,
  //face6
  -0.5,
  0.5,
  0.5,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
  0.5,
  0.5,
  0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
  0.5,
  0.5,
  -0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  -0.5,
  0.5,
  -0.5,
  1.0,
  1.0,
  0.0,
  0.0,
  0.0,
];
const indices = [
  0,
  1,
  3, //first  tri
  0,
  2,
  3, //second tri

  4,
  5,
  7, //first  tri
  4,
  6,
  7, //second tri

  8,
  9,
  11,
  8,
  10,
  11,

  12,
  13,
  15,
  12,
  14,
  15,

  16,
  17,
  19,
  16,
  18,
  19,

  20,
  21,
  23,
  20,
  22,
  23,
  //4,5,6,  //third tri
];

const tex2Vertices = [
  -0.5,
  -0.5,
  -0.5,
  1.0,
  1.0,
  0.0,
  0.0,
  0.0,
  0.5,
  -0.5,
  -0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  0.5,
  0.5,
  -0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
  -0.5,
  0.5,
  -0.5,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
];

const tex2Indexes = [0, 1, 3, 0, 2, 3];

const tex3Vertices = [
  -0.5,
  0.5,
  0.0,
  1.0,
  1.0,
  1.0,
  0.0,
  0.0,
  0.5,
  0.5,
  0.0,
  1.0,
  1.0,
  1.0,
  1.0,
  0.0,
  0.5,
  0.0,
  0.0,
  1.0,
  1.0,
  1.0,
  1.0,
  0.5,
  -0.5,
  0.0,
  0.0,
  1.0,
  1.0,
  1.0,
  0.0,
  0.5,
];

const tex3Indexes = [0, 1, 3, 0, 2, 3];

const crosshairVertices = [
  0.01,
  0.05,
  0.0,
  0.01,
  -0.05,
  0.0,
  -0.01,
  -0.05,
  0.0,
  -0.01,
  0.05,
  0.0,
];

const crosshairIndexes = [0, 1, 3, 0, 2, 3];

window.onload = async () => {
  const canvas = document.getElementById("mainCanvas");
  /** @type {WebGL2RenderingContext} */
  const gl = canvas.getContext("webgl2");

  if (gl === null) {
    alert("WebGL can't run on this browser. Seeya");
  } else {
    console.log("doing 1");
    let VAO, VBO, EBO;
    [VAO, VBO, EBO] = generateBuffers(gl, vertices, indices);
    console.log("1 done");

    console.log("doing 2");
    let VAO2, VBO2, EBO2;
    [VAO2, VBO2, EBO2] = generateBuffers(gl, tex2Vertices, tex2Indexes);
    console.log("2 done");

    console.log("doing 3");
    let VAO3, VBO3, EBO3;
    [VAO3, VBO3, EBO3] = generateBuffers(gl, tex3Vertices, tex3Indexes);
    console.log("3 done");

    gl.viewport(0,0,canvas.width, canvas.height)

    //var myShader = await compileShaderProgram(gl, "res/shaders/vertex/simple.vs", "res/shaders/fragment/simple.fs")
    var myShader = createProgramFromScripts(gl, ["simpleVS", "simpleFS"])


    var frames = 1000;
    var shouldClose = false;

    while (!shouldClose) {
      gl.clearColor(0.2, 0.3, 0.3, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(myShader);
      console.log(gl.getError());

      gl.bindVertexArray(VAO);
      console.log(gl.getError());

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EBO);
      console.log(gl.getError());

      gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_INT, 0);
      console.log(gl.getError());

      frames++;
      if (frames >= 1000) shouldClose = true;
    }
    //
  }
};
