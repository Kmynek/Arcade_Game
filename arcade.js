(async () => {
    const response = await fetch('https://imsi.pl:5000/players/Arcade%20vol1.0');
    console.log(`response status is ${response.status}`);
    const mediaType = response.headers.get('content-type');
    let data;
    if (mediaType.includes('json')) {
        data = await response.json();
    } else {
        data = await response.text();
    }
    let lista = "";
    let i = 5;
    data.sort((a, b) => b.p1 - a.p1);
    data.forEach(record => {
        // console.log(record);

        if (i > 0) lista += "<li>" + record.name + " : " + record.p1 + " points" + "</li>"; i--;
    });
    document.getElementById("records").innerHTML = lista;
})();




var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);



///////////////////////////////////////////////////////<---control
let up = 0, down = 0, left = 0, right = 0;
function onDocumentKeyDown(event) {
    event = event || window.event;
    var keycode = event.keyCode;
    switch (keycode) {
        case 37:
            left = 1;
            break;
        case 38:
            up = 1;
            break;
        case 39:
            right = 1;
            break;
        case 40:
            down = 1;
            break;
    }
}
function onDocumentKeyUp(event) {
    event = event || window.event;
    var keycode = event.keyCode;
    switch (keycode) {
        case 37: left = 0; break;
        case 38: up = 0; break;
        case 39: right = 0; break;
        case 40: down = 0; break;
    }
    return 3;
}
///////////////////////////////////////////////////////<---render
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
document.getElementById("game").appendChild(renderer.domElement);
///////////////////////////////////////////////////////<---scene+camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 0.1, 10000);
camera.rotation.x = (((Math.PI) / 180) * (-20))
camera.position.set(0, 50, 100)
scene.add(camera);

var light = new THREE.PointLight(0xFFFFFF);
light.position.set(-10, 15, 50);
scene.add(light);
///////////////////////////////////////////////////////<---background_declaration
const backgroundTexture = new THREE.TextureLoader().load("space2.jpg");
const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture });
const backgroundGeometry = new THREE.PlaneGeometry(16000, 12000, 1, 1);
const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
background.position.y = -400
background.position.z = -6000
scene.add(background);
///////////////////////////////////////////////////////<-special_background_declaration
const sbackgroundTexture = new THREE.TextureLoader().load("sback.jpg");
const sbackgroundMaterial = new THREE.MeshBasicMaterial({ map: sbackgroundTexture });
const sbackgroundGeometry = new THREE.PlaneGeometry(16000, 12000, 1, 1);
const sbackground = new THREE.Mesh(sbackgroundGeometry, sbackgroundMaterial);
sbackground.position.y = -400
sbackground.position.z = -5900

///////////////////////////////////////////////////////<---hpbar_declaration
const hpbarTexture = new THREE.TextureLoader().load("hpbar.png");
const hpbarMaterial = new THREE.MeshBasicMaterial({ map: hpbarTexture, transparent: true });
const hpbarGeometry = new THREE.PlaneGeometry(30, 25, 1, 1);
const hpbar = new THREE.Mesh(hpbarGeometry, hpbarMaterial);
hpbar.position.set(55, 36, -100);
camera.add(hpbar);
///////////////////////////////////////////////////////<---road_declaration
const roadTexture = new THREE.TextureLoader().load("road1.jpg");
roadTexture.wrapS = THREE.RepeatWrapping;
roadTexture.wrapT = THREE.RepeatWrapping;
roadTexture.repeat.set(1, 30);
const roadMaterial = new THREE.MeshBasicMaterial({ map: roadTexture });
const roadGeometry = new THREE.PlaneGeometry(200, 10000, 1, 1);
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.position.set(0, 0, 0);
road.rotation.x = (((Math.PI) / 180) * (-100))
scene.add(road);
///////////////////////////////////////////////////////<---front_of_spaceship_declaration
const frontTexture = new THREE.TextureLoader().load("spaceinside.png");
const frontMaterial = new THREE.MeshBasicMaterial({ map: frontTexture, transparent: true });
const frontGeometry = new THREE.PlaneGeometry(30, 15, 1, 1);
const front = new THREE.Mesh(frontGeometry, frontMaterial);
camera.add(front);
front.position.set(0, 0, -12.5);
///////////////////////////////////////////////////////<---speed_dart_declaration
const dartTexture = new THREE.TextureLoader().load("dart2.png");
const dartMaterial = new THREE.MeshBasicMaterial({ map: dartTexture, transparent: true });
const dartGeometry = new THREE.PlaneGeometry(2.5, 2.5, 1, 1);
const dart = new THREE.Mesh(dartGeometry, dartMaterial);
front.add(dart);
dart.position.set(0.0, -3.6, 0);
///////////////////////////////////////////////////////<---score_dart_declaration
const score_dartTexture = new THREE.TextureLoader().load("dart2.png");
const score_dartMaterial = new THREE.MeshBasicMaterial({ map: score_dartTexture, transparent: true });
const score_dartGeometry = new THREE.PlaneGeometry(1.5, 1.5, 1, 1);
const score_dart = new THREE.Mesh(score_dartGeometry, score_dartMaterial);
front.add(score_dart);
score_dart.position.set(-3.1, -3.65, 0);
const score100Texture = new THREE.TextureLoader().load("score100.png");
const score100Material = new THREE.MeshBasicMaterial({ map: score100Texture, transparent: true });
const score100Geometry = new THREE.PlaneGeometry(1.8, 0.6, 1, 1);
const score100 = new THREE.Mesh(score100Geometry, score100Material);
score100.position.set(-3.2, -1.8, 0);
front.add(score100);
///////////////////////////////////////////////////////<---boss_declaration
const bossTexture = new THREE.TextureLoader().load("boss3.gif");
const bossMaterial = new THREE.MeshBasicMaterial({ map: bossTexture, transparent: true });
const bossGeometry = new THREE.PlaneGeometry(3000, 2000, 1, 1);
const boss = new THREE.Mesh(bossGeometry, bossMaterial);
boss.position.set(0, 1300, - 5000);

///////////////////////////////////////////////////////<---sideroad_edges_declaration
const edgeTexture = new THREE.TextureLoader().load("edge3.png");
edgeTexture.wrapS = THREE.RepeatWrapping;
edgeTexture.wrapT = THREE.RepeatWrapping;
edgeTexture.repeat.set(1, 30);
const edgeMaterial = new THREE.MeshBasicMaterial({ map: edgeTexture, });
const edgeGeometry = new THREE.PlaneGeometry(20, 10000, 1, 1);
const edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
const edge2 = new THREE.Mesh(edgeGeometry, edgeMaterial);
const edge3 = new THREE.Mesh(edgeGeometry, edgeMaterial);
const edge4 = new THREE.Mesh(edgeGeometry, edgeMaterial);
edge.position.set(100, 10, 0);
edge2.position.set(-100, 10, 0);
edge3.position.set(101, 10, 0);
edge4.position.set(-101, 10, 0);
edge.rotation.x = (((Math.PI) / 180) * (-100))
edge2.rotation.x = (((Math.PI) / 180) * (-100))
edge.rotation.y = (((Math.PI) / 180) * (-90))
edge2.rotation.y = (((Math.PI) / 180) * (-270))
edge3.rotation.x = (((Math.PI) / 180) * (-100))
edge4.rotation.x = (((Math.PI) / 180) * (-100))
edge3.rotation.y = (((Math.PI) / 180) * (90))
edge4.rotation.y = (((Math.PI) / 180) * (270))
scene.add(edge);
scene.add(edge2);
scene.add(edge3);
scene.add(edge4);
///////////////////////////////////////////////////////<---sideroad_declaration
const grassTexture = new THREE.TextureLoader().load("grass.jpg");
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(1, 100);
const grassMaterial = new THREE.MeshBasicMaterial({ map: grassTexture, });
const grassGeometry = new THREE.PlaneGeometry(300, 10000, 1, 1);
const grass = new THREE.Mesh(grassGeometry, grassMaterial);
const grass2 = new THREE.Mesh(grassGeometry, grassMaterial);
grass.position.set(250, 0, 0);
grass2.position.set(-250, 0, 0);
grass.rotation.x = (((Math.PI) / 180) * (-100))
grass2.rotation.x = (((Math.PI) / 180) * (-100))
scene.add(grass);
scene.add(grass2);
///////////////////////////////////////////////////////<---stardust_declaration
let a = 0;
let a_side = 0;
let starGeo, stars;

starGeo = new THREE.Geometry();
for (let i = 0; i < 60000; i++) {
    let star = new THREE.Vector3(
        getRandomInt(-2000, 2000),
        getRandomInt(-1000, 500),
        getRandomInt(-200, 3000)
    );
    star.velocity = 0;
    star.acc = 0.02;
    starGeo.vertices.push(star);
}
let sprite = new THREE.TextureLoader().load("star.png");
let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 1.8,
    map: sprite,
    transparent: true
});
stars = new THREE.Points(starGeo, starMaterial);
stars.position.y = 103;
stars.position.z = -50000;
camera.add(stars);
///////////////////////////////////////////////////////<---viruses_declaration
let virusGeo, viruses;
virusGeo = new THREE.Geometry();
for (let i = 0; i < 5; i++) {
    let mby = getRandomInt(1, 4);

    if (mby == 1) mby = -70
    else if (mby == 2) mby = 0;
    else if (mby == 3) mby = 70;
    let virus = new THREE.Vector3(

        mby,
        380,
        getRandomInt(3000, 7000)
    );
    virus.velocity = 0;
    virus.acc = 1.01;
    virusGeo.vertices.push(virus);


}
let virusLoad = new THREE.TextureLoader().load("virus.png");
let virusMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 100,
    map: virusLoad,
    transparent: true
});
viruses = new THREE.Points(virusGeo, virusMaterial);
scene.add(viruses);
///////////////////////////////////////////////////////<---special_viruses_declaration
let svirusGeo, sviruses;
svirusGeo = new THREE.Geometry();
for (let i = 0; i < 1; i++) {
    let smby = getRandomInt(1, 4);

    if (smby == 1) smby = -70
    else if (smby == 2) smby = 0;
    else if (smby == 3) smby = 70;
    let svirus = new THREE.Vector3(

        smby,
        380,
        getRandomInt(3000, 7000)
    );
    svirus.velocity = 0;
    svirus.acc = 1.01;
    svirusGeo.vertices.push(svirus);


}
let svirusLoad = new THREE.TextureLoader().load("special_virus.png");
let svirusMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 81,
    map: svirusLoad,
    transparent: true
});
sviruses = new THREE.Points(svirusGeo, svirusMaterial);
//scene.add(sviruses);
///////////////////////////////////////////////////////<---sideroad_bonus_declaration

let sideGeo, sides;
sideGeo = new THREE.Geometry();
for (let i = 0; i < 2; i++) {
    let sidemby = getRandomInt(1, 7);

    if (sidemby == 1) sidemby = -2000
    if (sidemby == 2) sidemby = -1000
    if (sidemby == 3) sidemby = -1500
    if (sidemby == 4) sidemby = 2000
    if (sidemby == 5) sidemby = 1000
    else if (sidemby == 6) sidemby = 1500;
    let side = new THREE.Vector3(

        sidemby,
        -400,
        8000
    );
    side.velocity = 0;
    side.acc = 1.01;
    sideGeo.vertices.push(side);


}
let sideLoad = new THREE.TextureLoader().load("side.png");
let sideMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 2500,
    map: sideLoad,
    transparent: true
});
sides = new THREE.Points(sideGeo, sideMaterial);
scene.add(sides);

///////////////////////////////////////////////////////<---scores_declaration
let scoreGeo, scores;
scoreGeo = new THREE.Geometry();
for (let i = 0; i < 2; i++) {
    let mby = getRandomInt(1, 4);

    if (mby == 1) mby = -70
    else if (mby == 2) mby = 0;
    else if (mby == 3) mby = 70;
    let score = new THREE.Vector3(

        mby,
        290,
        getRandomInt(3000, 7000)
    );
    score.velocity = 0;
    score.acc = 1.01;
    scoreGeo.vertices.push(score);


}
let scoreLoad = new THREE.TextureLoader().load("score.png");
let scoreMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 80,
    map: scoreLoad,
    transparent: true
});
scores = new THREE.Points(scoreGeo, scoreMaterial);
scene.add(scores);
///////////////////////////////////////////////////////<---rare_scores_declaration
let rscoreGeo, rscores;
rscoreGeo = new THREE.Geometry();

let rmby = getRandomInt(1, 4);

if (rmby == 1) rmby = -70
else if (rmby == 2) rmby = 0;
else if (rmby == 3) rmby = 70;
let rscore = new THREE.Vector3(

    rmby,
    290,
    getRandomInt(3000, 7000)
);
rscore.velocity = 0;
rscore.acc = 1.01;
rscoreGeo.vertices.push(rscore);



let rscoreLoad = new THREE.TextureLoader().load("rare.png");
let rscoreMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 80,
    map: rscoreLoad,
    transparent: true
});
rscores = new THREE.Points(rscoreGeo, rscoreMaterial);
scene.add(rscores);
///////////////////////////////////////////////////////<---clock
var clock = new THREE.Clock;
dt = clock.getDelta();
///////////////////////////////////////////////////////<---animate_function
let hp = 5;
let score = 0;
let godflag = 0, sgodflag = 0;
let once = 0;
let bossflag = 0;
let added = 0;
let game_over_flag = 0;
let sideroad_flag = 0;
const animate = function () {


    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    /////////////////////////////////////////////////////////////////////////////////////////////<---speed_and_side		
    if (up === 1) {
        a += 0.00019;

    }

    if (down === 1) {

        if (a > 0) a -= 0.0002;
        else a = 0;
    }
    a /= 1.002;

    if ((camera.position.x < -110 || camera.position.x > 110)) {


        a /= 1.02;
    }

    road.material.map.offset.y += a;
    edge.material.map.offset.y += a;
    grass.material.map.offset.y += a;

    if (left === 1) {
        // a_side -= 0.03;
        a_side -= a;

    }

    if (right === 1) {
        // a_side += 0.03;
        a_side += a;
    }

    if (right == 0 && left == 0) {
        a_side /= 1.01;
    }
    a_side /= 1.0001;
    if (camera.position.x < 400 && camera.position.x > -400) camera.position.x += a_side;
    else {

        if (camera.position.x >= 400) camera.position.x = 380; a_side = 0;
        if (camera.position.x <= -400) camera.position.x = -380; a_side = 0;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////<---speed_dart_animate
    dart.rotation.z = (((Math.PI) / 180) * (125 - (a * 2000)));
    /////////////////////////////////////////////////////////////////////////////////////////////<---score_dart_animate
    score_dart.rotation.z = (((Math.PI) / 180) * (130 - (score * 0.15)));
    /////////////////////////////////////////////////////////////////////////////////////////////<---stardust_animate
    starGeo.vertices.forEach(p => {
        p.velocity += p.acc;
        p.z -= p.velocity;
        if (p.z < -200) {
            p.z = 3000;
            p.velocity = 0;
        }
    });
    starGeo.verticesNeedUpdate = true;
    stars.position.y = 370;
    stars.position.z = -200;
    stars.rotation.x = (((Math.PI) / 180) * (-170))

    /////////////////////////////////////////////////////////////////////////////////////////////<---viruses_animate
    virusGeo.vertices.forEach(pv => {
        if (up === 1) {
            pv.acc += 0.01;

        }
        if (down === 1) {

            if (pv.acc > 0) pv.acc -= 0.02;
            else pv.acc = 0;
        }
        pv.acc /= 1.001;
        if (!(camera.position.x < -110 || camera.position.x > 110)) pv.z -= pv.acc;
        let part1 = Math.abs((Math.pow(pv.x - camera.position.x, 2)));
        let part2 = Math.abs((Math.pow(pv.z + 200, 2)));
        let distance = Math.abs(Math.sqrt((part1 + part2)));

        /////////////////////////////////////////////////////////////////////////////////////////////<---hit_event
        if (distance < 35) {
            pv.z = getRandomInt(1500, 6000);
            pv.velocity = pv.acc;
            hp--;
            a *= 0.5;
            let rand_hit = getRandomInt(1, 3);

            if (rand_hit == 1) {
                a_side -= 1;
            }
            if (rand_hit == 2) {
                a_side += 1;
            }
            const blankTexture = new THREE.TextureLoader().load("blank.png");
            const blankMaterial = new THREE.MeshBasicMaterial({ map: blankTexture, transparent: true });
            const blankGeometry = new THREE.PlaneGeometry(5.5, 5.5, 1, 1);
            const blank = new THREE.Mesh(blankGeometry, blankMaterial);
            let x = (4 - hp) * (6);
            blank.position.set(42 + x, 35, -99);
            camera.add(blank);
            for (let i = 0; i < 5; i++) {
                const hpdownTexture = new THREE.TextureLoader().load("hp3.png");
                const hpdownMaterial = new THREE.MeshBasicMaterial({ map: hpdownTexture, transparent: true });
                const hpdownGeometry = new THREE.PlaneGeometry(40, 40, 1, 1);
                const hpdown = new THREE.Mesh(hpdownGeometry, hpdownMaterial);
                hpdown.position.set(getRandomInt(-110, 110), getRandomInt(-80, 50), -99);
                camera.add(hpdown);
            }
            if (hp == 0 && !game_over_flag) {////////////////////////////////////////////////////////game_lost
                game_over_flag = 1;
                var username = prompt("YOUR SCORE :" + score + " GAME OVER! ENTER YOUR NAME: ");
                //console.log(username);
                let score1 = score;

                (async () => {
                    const headers = new Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('content-length', '27');

                    let body = {
                        name: username
                    };
                    body = JSON.stringify(body);
                    let init = {
                        method: 'PUT',
                        headers,
                        body
                    };

                    let response = await fetch('https://imsi.pl:5000/players', init);
                    //console.log(`response status is ${response.status}`);
                    let mediaType = response.headers.get('content-type');
                    let data;
                    if (mediaType.includes('json')) {
                        data = await response.json();
                    } else {
                        data = await response.text();
                    }

                    //console.log(data.id + "create");

                    if (data.id == 0) {

                        response = await fetch('https://imsi.pl:5000/player/' + username);
                        //console.log(`response status is ${response.status}`);
                        mediaType = response.headers.get('content-type');

                        if (mediaType.includes('json')) {
                            data = await response.json();
                        } else {
                            data = await response.text();
                        }
                        //console.log(data[0].p1);
                        if (data[0].p1 < score1) {
                            body = {
                                p0: "Arcade vol1.0",
                                p1: score1,
                            };
                            body = JSON.stringify(body);
                            init = {
                                method: 'PUT',
                                headers,
                                body
                            };

                            response = await fetch('https://imsi.pl:5000/players/' + data[0].id, init);
                            // console.log(`response status is ${response.status}`);
                            mediaType = response.headers.get('content-type');

                            if (mediaType.includes('json')) {
                                data = await response.json();
                            } else {
                                data = await response.text();
                            }
                            // console.log(data);
                        }

                    }
                    else {
                        body = {
                            p0: "Arcade vol1.0",
                            p1: score1,
                        };
                        body = JSON.stringify(body);
                        init = {
                            method: 'PUT',
                            headers,
                            body
                        };

                        response = await fetch('https://imsi.pl:5000/players/' + data.id, init);
                        //console.log(`response status is ${response.status}`);
                        mediaType = response.headers.get('content-type');

                        if (mediaType.includes('json')) {
                            data = await response.json();
                        } else {
                            data = await response.text();
                        }

                    }

                    window.location.reload(true);
                })();


            }
        }

        if (pv.z < -200) {

            pv.z = getRandomInt(1500, 6000);
            pv.x = 140 + (getRandomInt(1, 4) * -70);

            pv.velocity = pv.acc;
            if (!(camera.position.x < -110 || camera.position.x > 110)) score++;
        }





    });
    /////////////////////////////////////////////////////////////////////////////////////////////<---special_viruses_animate
    if (added) {
        svirusGeo.vertices.forEach(spv => {
            if (up === 1) {
                spv.acc += 0.01;

            }
            if (down === 1) {

                if (spv.acc > 0) spv.acc -= 0.02;
                else spv.acc = 0;
            }
            spv.acc /= 1.001;
            if (!(camera.position.x < -110 || camera.position.x > 110)) spv.z -= spv.acc;
            let spart1 = Math.abs((Math.pow(spv.x - camera.position.x, 2)));
            let spart2 = Math.abs((Math.pow(spv.z + 200, 2)));
            let sdistance = Math.abs(Math.sqrt((spart1 + spart2)));

            /////////////////////////////////////////////////////////////////////////////////////////////<---hit_event

            if (sdistance < 35) {
                spv.z = getRandomInt(1500, 6000);
                spv.velocity = spv.acc;
                hp--;
                a *= 0.5;
                let srand_hit = getRandomInt(1, 3);

                if (srand_hit == 1) {
                    a_side -= 1;
                }
                if (srand_hit == 2) {
                    a_side += 1;
                }
                const blankTexture = new THREE.TextureLoader().load("blank.png");
                const blankMaterial = new THREE.MeshBasicMaterial({ map: blankTexture, transparent: true });
                const blankGeometry = new THREE.PlaneGeometry(5.5, 5.5, 1, 1);
                const blank = new THREE.Mesh(blankGeometry, blankMaterial);
                x = (4 - hp) * (6);
                blank.position.set(42 + x, 35, -99);
                camera.add(blank);
                for (let i = 0; i < 5; i++) {
                    const hpdownTexture = new THREE.TextureLoader().load("hp3.png");
                    const hpdownMaterial = new THREE.MeshBasicMaterial({ map: hpdownTexture, transparent: true });
                    const hpdownGeometry = new THREE.PlaneGeometry(40, 40, 1, 1);
                    const hpdown = new THREE.Mesh(hpdownGeometry, hpdownMaterial);
                    hpdown.position.set(getRandomInt(-110, 110), getRandomInt(-80, 50), -99);
                    camera.add(hpdown);
                }

            }
            if (hp == 0 && !game_over_flag) {////////////////////////////////////////////////////////game_lost
                game_over_flag = 1;
                var username = prompt("YOUR SCORE :" + score + " GAME OVER! ENTER YOUR NAME: ");
                //console.log(username);
                let score1 = score;

                (async () => {
                    const headers = new Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('content-length', '27');

                    let body = {
                        name: username
                    };
                    body = JSON.stringify(body);
                    let init = {
                        method: 'PUT',
                        headers,
                        body
                    };

                    let response = await fetch('https://imsi.pl:5000/players', init);
                    //console.log(`response status is ${response.status}`);
                    let mediaType = response.headers.get('content-type');
                    let data;
                    if (mediaType.includes('json')) {
                        data = await response.json();
                    } else {
                        data = await response.text();
                    }

                    //console.log(data.id + "create");

                    if (data.id == 0) {

                        response = await fetch('https://imsi.pl:5000/player/' + username);
                        //console.log(`response status is ${response.status}`);
                        mediaType = response.headers.get('content-type');

                        if (mediaType.includes('json')) {
                            data = await response.json();
                        } else {
                            data = await response.text();
                        }
                        //console.log(data[0].p1);
                        if (data[0].p1 < score1) {
                            body = {
                                p0: "Arcade vol1.0",
                                p1: score1,
                            };
                            body = JSON.stringify(body);
                            init = {
                                method: 'PUT',
                                headers,
                                body
                            };

                            response = await fetch('https://imsi.pl:5000/players/' + data[0].id, init);
                            //console.log(`response status is ${response.status}`);
                            mediaType = response.headers.get('content-type');

                            if (mediaType.includes('json')) {
                                data = await response.json();
                            } else {
                                data = await response.text();
                            }
                            // console.log(data);
                        }

                    }
                    else {
                        body = {
                            p0: "Arcade vol1.0",
                            p1: score1,
                        };
                        body = JSON.stringify(body);
                        init = {
                            method: 'PUT',
                            headers,
                            body
                        };

                        response = await fetch('https://imsi.pl:5000/players/' + data.id, init);
                        //console.log(`response status is ${response.status}`);
                        mediaType = response.headers.get('content-type');

                        if (mediaType.includes('json')) {
                            data = await response.json();
                        } else {
                            data = await response.text();
                        }

                    }

                    window.location.reload(true);
                })();


            }
            if (spv.z < -200) {

                spv.z = getRandomInt(1500, 6000);
                spv.x = 140 + (getRandomInt(1, 4) * -70);

                spv.velocity = spv.acc;
                if (!(camera.position.x < -110 || camera.position.x > 110)) score++;
            }





        });
    }
    /////////////////////////////////////////////////////////////////////////////////////////////<---score_animate
    scoreGeo.vertices.forEach(ps => {
        if (up === 1) {
            ps.acc += 0.01;

        }
        if (down === 1) {

            if (ps.acc > 0) ps.acc -= 0.02;
            else ps.acc = 0;
        }
        ps.acc /= 1.001;
        if (!(camera.position.x < -110 || camera.position.x > 110)) ps.z -= ps.acc;
        let part1s = Math.abs((Math.pow(ps.x - camera.position.x, 2)));
        let part2s = Math.abs((Math.pow(ps.z + 200, 2)));
        let distances = Math.abs(Math.sqrt((part1s + part2s)));

        /////////////////////////////////////////////////////////////////////////////////////////////<---hit_event
        if (distances < 35) {
            ps.z = getRandomInt(1500, 6000);
            score += 5;
            a = a + (a * 0.02);
        }

        if (ps.z < -200) {
            ps.z = getRandomInt(1500, 6000);
            ps.x = 140 + (getRandomInt(1, 4) * -70);
            ps.velocity = ps.acc;
            if (!(camera.position.x < -110 || camera.position.x > 110)) score++;
        }
    });
    /////////////////////////////////////////////////////////////////////////////////////////////<---rare_score_animate

    rscoreGeo.vertices.forEach(rps => {
        if (up === 1) {
            rps.acc += 0.01;

        }
        if (down === 1) {

            if (rps.acc > 0) rps.acc -= 0.02;
            else rps.acc = 0;
        }
        rps.acc /= 1.001;
        if (!(camera.position.x < -110 || camera.position.x > 110)) rps.z -= rps.acc;
        let rpart1s = Math.abs((Math.pow(rps.x - camera.position.x, 2)));
        let rpart2s = Math.abs((Math.pow(rps.z + 200, 2)));
        let rdistances = Math.abs(Math.sqrt((rpart1s + rpart2s)));

        /////////////////////////////////////////////////////////////////////////////////////////////<---hit_event
        if (rdistances < 35) {
            rps.z = getRandomInt(1500, 6000);
            let chance = getRandomInt(1, 7);
            //console.log(chance);
            if (chance == 2) {
                rps.x = 140 + (getRandomInt(1, 4) * -70);
            }
            else {
                rps.x = 10000;
            }
            score += 20;
            a = a + (a * 0.02);
        }

        if (rps.z < -200) {
            rps.z = getRandomInt(1500, 6000);
            let chance = getRandomInt(1, 7);
            //console.log(chance);
            if (chance == 2) {
                rps.x = 140 + (getRandomInt(1, 4) * -70);
            }
            else {
                rps.x = 10000;
            }
            rps.velocity = rps.acc;
            if (!(camera.position.x < -110 || camera.position.x > 110)) score++;
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////<---side_animate
    sideGeo.vertices.forEach(ps => {
        if (up === 1) {
            ps.acc += 0.01;

        }
        if (down === 1) {

            if (ps.acc > 0) ps.acc -= 0.02;
            else ps.acc = 0;
        }
        ps.acc /= 1.001;
        if (!(camera.position.x < -110 || camera.position.x > 110)) ps.z -= ps.acc;
        let sidepart1s = Math.abs((Math.pow(ps.x - camera.position.x, 2)));
        let sidepart2s = Math.abs((Math.pow(ps.z + 200, 2)));
        let sidedistances = Math.abs(Math.sqrt((sidepart1s + sidepart2s)));

        /////////////////////////////////////////////////////////////////////////////////////////////<---hit_event
        if (sidedistances < 35) {
            spv.z = getRandomInt(1500, 6000);
            spv.velocity = spv.acc;
            hp--;
            a *= 0.5;
            let srand_hit = getRandomInt(1, 3);

            if (srand_hit == 1) {
                a_side -= 1;
            }
            if (srand_hit == 2) {
                a_side += 1;
            }
        }


        // if (sidemby == 1) sidemby = -2000
        // if (sidemby == 2) sidemby = -1000
        // if (sidemby == 3) sidemby = -1500
        // if (sidemby == 4) sidemby = 2000
        // if (sidemby == 5) sidemby = 1000
        // else if (sidemby == 6) sidemby = 1500;
        let plusminus = getRandomInt(1, 3);
        if (ps.z < -200) {
            ps.z = 8000
            // ps.x = -2000 + (getRandomInt(1, 7) * 500);
            if (plusminus == 1) {
                ps.x = (-1) * (500 + (getRandomInt(1, 4) * 500));
            }
            else {
                ps.x = (500 + (getRandomInt(1, 4) * 500));
            }
            ps.velocity = ps.acc;

        }






    });
    /////////////////////////////////////////////////////////////////////////////////////////////<---virus_update
    virusGeo.verticesNeedUpdate = true;
    viruses.position.y = 370;
    viruses.position.z = -200;



    viruses.rotation.x = 2.967059;

    /////////////////////////////////////////////////////////////////////////////////////////////<---side_update
    sideGeo.verticesNeedUpdate = true;
    sides.position.y = 370;
    sides.position.z = -200;



    sides.rotation.x = 2.967059;
    /////////////////////////////////////////////////////////////////////////////////////////////<---score_update
    scoreGeo.verticesNeedUpdate = true;
    scores.position.y = 370;
    scores.position.z = -200;

    scores.rotation.x = 2.967059;
    /////////////////////////////////////////////////////////////////////////////////////////////<---rare_score_update

    rscoreGeo.verticesNeedUpdate = true;
    rscores.position.y = 370;
    rscores.position.z = -200;

    rscores.rotation.x = 2.967059;


    /////////////////////////////////////////////////////////////////////////////////////////////<---special_virus_update
    if (added) {
        svirusGeo.verticesNeedUpdate = true;
        sviruses.position.y = 370;
        sviruses.position.z = -200;
        sviruses.rotation.x = 2.967059;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////<---god_mode


    if (score > 100 && !godflag) {
        godflag = 1;
        const godmodeTexture = new THREE.TextureLoader().load("godmode2.png");
        const godmodeMaterial = new THREE.MeshBasicMaterial({ map: godmodeTexture, transparent: true });
        const godmodeGeometry = new THREE.PlaneGeometry(4, 1, 1, 1);
        const godmode = new THREE.Mesh(godmodeGeometry, godmodeMaterial);
        godmode.position.set(7, -2.5, -10);
        camera.add(godmode);
        a = a + 0.002;
    }
    if (score > 300 && !sgodflag) {
        sgodflag = 1;
        const sgodmodeTexture = new THREE.TextureLoader().load("sgodmode.png");
        const sgodmodeMaterial = new THREE.MeshBasicMaterial({ map: sgodmodeTexture, transparent: true });
        const sgodmodeGeometry = new THREE.PlaneGeometry(3, 1, 1, 1);
        const sgodmode = new THREE.Mesh(sgodmodeGeometry, sgodmodeMaterial);
        sgodmode.position.set(7, -1.5, -10);
        camera.add(sgodmode);
        a = a + 0.0003;
    }


    if (score > 500 && !bossflag) {
        bossflag = 1;
        front.add(boss);
        scene.add(sbackground);
        if (!added) {
            added = 1;
            scene.add(sviruses);
        }

    }


    document.getElementById("score").innerHTML = score;

}

animate();

