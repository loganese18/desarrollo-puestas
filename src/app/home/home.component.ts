import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './responsive-styles.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  @ViewChild('menu') menuRef!: ElementRef;
  @ViewChild('scroll') scrollRef!: ElementRef;
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  ngOnInit(): void {
    this.slickModal.initSlick();
  }

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: true,
        },
      },
    ],
  };

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  openMenu(): void {
    const menu = this.menuRef.nativeElement as HTMLElement;
    menu.style.display = 'flex';
    setTimeout(() => {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }, 0);
    console.log('button clicked');
  }

  collapseMenu(): void {
    const menu = this.menuRef.nativeElement as HTMLElement;

    menu.classList.add('close');
    setTimeout(() => {
      menu.style.display = 'none';
      document.body.style.overflow = 'auto';
      menu.classList.remove('open', 'close');
    }, 1000);
    console.log('collapsed');
  }

  closeMenu(): void {
    const menu = this.menuRef.nativeElement as HTMLElement;
    menu.style.display = 'none';
    menu.classList.remove('open', 'close');
    document.body.style.overflow = 'auto';
  }

  scrollToElement(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    console.log('anda');
  }

  @HostListener('window:scroll')
  windowScroll() {
    const scroll = this.scrollRef.nativeElement as HTMLElement;
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition > 200) {
      scroll.style.display = 'block';
    } else {
      scroll.style.display = 'none';
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  puestas: string[] = [
    './assets/puestas-mobile/mobile-puesta1.png',
    './assets/puestas-mobile/mobile-puesta2.png',
    './assets/puestas-mobile/mobile-puesta3.png',
    './assets/puestas-mobile/mobile-puesta4.png',
    './assets/puestas-mobile/mobile-puesta5.png',
    './assets/puestas-mobile/mobile-puesta6.png',
    './assets/puestas-mobile/mobile-puesta7.png',
    './assets/puestas-mobile/mobile-puesta8.png',
    './assets/puestas-mobile/mobile-puesta9.png',
    './assets/puestas-mobile/mobile-puesta10.png',
  ];

  currentImgIndex = 0;

  showPreviousImage() {
    if (this.currentImgIndex > 0) {
      this.currentImgIndex--;
    } else {
      this.currentImgIndex = this.puestas.length - 1;
    }
  }

  showNextImage() {
    if (this.currentImgIndex < this.puestas.length - 1) {
      this.currentImgIndex++;
    } else {
      this.currentImgIndex = 0;
    }
  }
}
