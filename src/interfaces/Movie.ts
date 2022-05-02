export interface Movie {
    id?: string;
    title: string;
    description: string;
    year?: string;
    release_date: string;
    runtime: number;
    rating: number;
    mpaa_rating: string;
    genres?: [];
}