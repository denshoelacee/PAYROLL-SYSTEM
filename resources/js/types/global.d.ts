import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }
    interface Window {
    Pusher: any;
  }

    var route: typeof ziggyRoute;
}
