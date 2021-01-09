#version 300 es
in vec3 vertexColor;
in vec2 textureCoord;

out vec4 FragColor;

//uniform sampler2D mytexture;

void main() {
    //FragColor = vec4( 1.0f * (gl_FragCoord.x / 800), 1.0f * (gl_FragCoord.y / 600), 1.0f * gl_FragCoord.z, 0.0f );
    FragColor = vec4(vertexColor, 0.7f);
    //FragColor = texture(mytexture, textureCoord) * vec4(vertexColor, 0.7f);
}