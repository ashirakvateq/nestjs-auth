export class CreateUser {
    role: any;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    password: string;
    phone_number: string;
    is_verified?: boolean;
    is_blocked?: boolean;
    profile_image_url: string;
  }