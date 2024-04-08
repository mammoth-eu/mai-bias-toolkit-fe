import { Selections } from './model-steps/model';

export interface RunResponse {
   runs: Run[];
}

export interface Run {
   group: string;
   name: string;
   run_id: string;
   run_end_time: string;
   run_start_time: string;
   run_status: string;
   run_type: string;
   uuid: string;
}

export interface RunDetailsResponse {
   selections: Selections;
}
