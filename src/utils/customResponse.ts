class ServerResponse {
    private static instance: ServerResponse;
  
    private constructor() {}
  
    static getInstance(): ServerResponse {
      if (!ServerResponse.instance) {
        ServerResponse.instance = new ServerResponse();
      }
      return ServerResponse.instance;
    }
  
    responseOk(code: number, cause?: string, data?: any): any {
      const response = {
        success: true,
        code: code,
        message: cause ? cause : undefined,
        data: data ? data : undefined,
      };
      return response;
    }
  
    badResponse(code: number, cause: string, data?: any): any {
      const response = {
        success: false,
        code: code,
        message: cause,
        data: data ? data : undefined,
      };
      return response;
    }
  }
  
  const customResponses = ServerResponse.getInstance();
  export default customResponses;
  