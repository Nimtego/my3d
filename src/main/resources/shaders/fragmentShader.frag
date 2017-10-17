#version 400 core

in vec2 pass_textureCoordinates;
in vec3 surfaceNormal;
in vec3 toLightVector;
in vec3 toCameraVector;

out vec4 out_Colour;

uniform sampler2D textureSampler;
uniform vec3 lightColour;
uniform float shineDamper;
uniform float reflectivity;

void main(void) {
    vec3 unitNormal = normalize(surfaceNormal);
    vec3 unitLightVector = normalize(toLightVector);

    float nDotl = dot(unitNormal, unitLightVector);
    float brightness = max(nDotl, 0.1);
    vec3 diffuse = brightness * lightColour;
    vec3 unitVectorToCamera = normalize(toCameraVector);
    vec3 lightDirection = -unitLightVector;
    vec3 reflectedLightDirection = reflect(lightDirection, unitNormal);
    float specularFactor = dot(reflectedLightDirection, unitVectorToCamera);
    specularFactor = max(specularFactor, 0.0);
    float damperFactor = pow(specularFactor, shineDamper);
    vec3 finalSpecular = damperFactor * reflectivity * lightColour;
//    vec4 textureColour = texture(modelTexture, pass_textureCoordinates);
//    if(textureColour.a < 0.5) {
//        discard;
//    }
    out_Colour = vec4(diffuse, 1.0) * texture(textureSampler, pass_textureCoordinates) + vec4(finalSpecular, 0.0);
}