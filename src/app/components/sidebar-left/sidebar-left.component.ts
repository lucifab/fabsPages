import { Component } from '@angular/core';
import { MoveDirection, OutMode, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { faLinkedin, faGithub, faTumblr } from '@fortawesome/free-brands-svg-icons';


@Component({
    selector: 'app-sidebar-left',
    templateUrl: './sidebar-left.component.html',
    styleUrls: ['./sidebar-left.component.scss'],
    standalone: false
})
export class SidebarLeftComponent {

  // Icons
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faTumblr = faTumblr;

  //Particle Effects
  particlesOptions = {
   
    fpsLimit: 120,
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: false,
            opacity: 0.5,
            width: 1,
        },
        collisions: {
            enable: false,
        },
        move: {
            direction: MoveDirection.none,
            enable: true,
            outModes: {
                default: OutMode.bounce,
            },
            random: false,
            speed: 1,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 80,
        },
        opacity: {
            value: 0.4,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
    detectRetina: true,
};


async particlesInit(engine: Engine): Promise<void> {

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}

}
