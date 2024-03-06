varying vec2 vUv;
varying float vTime;

// lets say for now that the sward is placed in the center of the place (uv 0.5,0.5)

void main()
{
 
    float timeFactor = 0.1;

    float distanceToSward = distance(vec2(0.5), vUv) - vTime * 0.1;
    float firstDecimal = floor(fract(distanceToSward) * 10.0);

    gl_FragColor = vec4(vec3(0.1 * distanceToSward), 1.0);

    if ((fract(distanceToSward) * 10.0 - firstDecimal) * 10.0 < 0.3){
        gl_FragColor = vec4(1.0);
    }

}