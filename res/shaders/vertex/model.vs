#version 300 es
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoords;

out vec2 TexCoords;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

uniform mat4 transform;

void main() {
    TexCoords = vec2(aTexCoords.x, aTexCoords.y * -1);    
    gl_Position = projection * view * model * transform * vec4(aPos, 1.0);
}