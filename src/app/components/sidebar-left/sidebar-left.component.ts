import { Component } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode, Engine, Container } from "tsparticles-engine";
import { loadFull } from "tsparticles";

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent {

  particlesOptions = {
    fpsLimit: 60,
    particles: {
      color: {
        value: "#000"
      },
      links: {
        enable: false
      },
      opacity: {
        value: 0.9
      },
      shape: {
        type: "star"
      },
      size: {
        value: 1
      },
      move: {
        enable: true
      }
    }
  };

  particlesLoaded(container: Container): void {
    console.log(container);
}

async particlesInit(engine: Engine): Promise<void> {
    console.log("particles initiated");

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}

}
