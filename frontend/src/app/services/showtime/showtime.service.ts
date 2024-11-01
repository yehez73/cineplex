import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Seat {
  seat_code: string;
  is_available: boolean;
}

export interface Showtime {
  id: string;
  movie_id: string;
  theater_id: string;
  show_date: string;
  start_time: string;
  end_time: string;
  available_seats: Seat[];
  pricing: number;
  created_at: string;
  updated_at: string;
}

export interface TheaterShowtime {
  theater_id: string;
  theater_name: string;
  theater_location: string;
  showtimes: Showtime[];
}

export interface GroupedShowtime {
  theaters: TheaterShowtime[];
}

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  private apiUrl = environment.apiUrl;

  constructor() { }

  getGroupedShowtime(id: string, date: string): Observable<GroupedShowtime> {
    return from(axios.get<GroupedShowtime>(`${this.apiUrl}/showtime/${id}/${date}`).then(response => response.data));
  }  
}
