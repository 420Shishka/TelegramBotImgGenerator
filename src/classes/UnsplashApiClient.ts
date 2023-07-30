import 'dotenv/config';

const API_BASE_URL = process.env.API_BASE_URL as string;
const API_TOKEN = process.env.API_TOKEN as string;

interface IUnsplashApiImage {
  urls: { regular: string };
}

type CustomRequestOptions = RequestInit & {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
}

type SearchImagesResponse = {
  results: IUnsplashApiImage[];
}

class UnsplashApiClient {
  public static async searchImages(input: string, count: number) {
    const params = new URLSearchParams({
      query: input,
      per_page: String(count),
    })

    return UnsplashApiClient.sendRequest<SearchImagesResponse>({
      method: 'GET',
      path: `/search/photos/?${params}`,
    })
  }

  private static async sendRequest<T>(
    options: CustomRequestOptions
  ): Promise<T> {
    const { path, headers: customHeaders, ...restOptions } = options;

    if (!API_BASE_URL) {
      throw new Error('API_BASE_URL is not defined');
    }

    if (!API_TOKEN) {
      throw new Error('API_TOKEN is not defined');
    }

    const response = await fetch(API_BASE_URL + path, {
      headers: {
        'Authorization': `Client-ID ${API_TOKEN}`,
        ...customHeaders,
      },
      ...restOptions,
    });

    return response.json();
  }
}

export { UnsplashApiClient };