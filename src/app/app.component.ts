import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  #http = inject(HttpClient);

  ngOnInit() {
    this.spamHttpRequests();
  }

  spamHttpRequests() {

    const requests = [
      this.#http.get('https://dog.ceo/api/breeds/image/random'),
      this.#http.get('https://catfact.ninja/fact'),
      this.#http.get('https://jsonplaceholder.typicode.com/photos'),
      this.#http.get('https://jsonplaceholder.typicode.com/comments'),
      this.#http.get('https://api.zippopotam.us/us/90210'),
      this.#http.get('https://official-joke-api.appspot.com/random_joke')
    ];

    

    for (let i = 0; i < 5; i++) {
      forkJoin(requests).subscribe(data => {
        localStorage.setItem(`done n°${i}`,data.toString());
        sessionStorage.setItem(`done n°${i}`,data.toString());
        console.log(`Pack de données inutiles n°${i} reçu !`, data);
      });
    }
  }


}