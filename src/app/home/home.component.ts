import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './responsive-styles.css'],
})
export class HomeComponent implements OnInit {
  constructor() {
    window.onload = () => {
      this.checkScreenWidth();
    };
  }

  @ViewChild('menu') menuRef!: ElementRef;
  @ViewChild('scroll') scrollRef!: ElementRef;
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  ngOnInit(): void {
    const swiper = new Swiper('.swiper', {
      autoplay: false,
      centeredSlides: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true, // Permite hacer clic en los puntos para navegar a la diapositiva correspondiente
      },
      modules: [Navigation, Pagination],
    });
    console.log('Inicialización de Swiper');
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

  puestas_mobile: string[] = [
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
    './assets/puestas-mobile/mobile-puesta11.png',
    './assets/puestas-mobile/mobile-puesta12.png',
  ];
  puestas_desktop: string[] = [
    './assets/puestas-desktop/desktop-puesta1.png',
    './assets/puestas-desktop/desktop-puesta2.png',
    './assets/puestas-desktop/desktop-puesta3.png',
    './assets/puestas-desktop/desktop-puesta4.png',
    './assets/puestas-desktop/desktop-puesta5.png',
    './assets/puestas-desktop/desktop-puesta6.png',
    './assets/puestas-desktop/desktop-puesta7.png',
    './assets/puestas-desktop/desktop-puesta8.png',
  ];

  currentImgIndex = 0;
  isMobileScreen = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    if (window.innerWidth > 950) {
      this.isMobileScreen = false;
    } else {
      this.isMobileScreen = true;
    }
  }

  showPreviousImage() {
    if (this.isMobileScreen) {
      if (this.currentImgIndex > 0) {
        this.currentImgIndex--;
      } else {
        this.currentImgIndex = this.puestas_mobile.length - 1;
      }
    } else {
      if (this.currentImgIndex > 0) {
        this.currentImgIndex--;
      } else {
        this.currentImgIndex = this.puestas_desktop.length - 1;
      }
    }
  }

  showNextImage() {
    if (this.isMobileScreen) {
      if (this.currentImgIndex < this.puestas_mobile.length - 1) {
        this.currentImgIndex++;
      } else {
        this.currentImgIndex = 0;
      }
    } else {
      if (this.currentImgIndex < this.puestas_desktop.length - 1) {
        this.currentImgIndex++;
      } else {
        this.currentImgIndex = 0;
      }
    }
  }
}
