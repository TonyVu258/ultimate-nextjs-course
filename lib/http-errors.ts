/*
  Base error class for handling custom API errors.
  This extends the built-in Error class to include additional properties.
*/
export class RequestError extends Error {
    statusCode: number; // HTTP status code associated with the error
    errors?: Record<string, string[]>; // Optional object containing field-specific errors
  
    constructor(
      statusCode: number,
      message: string,
      errors?: Record<string, string[]>
    ) {
      super(message); // Call the parent class (Error) constructor with the error message
      this.statusCode = statusCode; // Assign the HTTP status code
      this.errors = errors; // Assign field-specific errors if provided
      this.name = "RequestError"; // Set the error name for identification
    }
  }
  
  /*
    ValidationError is a subclass of RequestError.
    It is used when validation of user input fails.
  */
  export class ValidationError extends RequestError {
    constructor(fieldErrors: Record<string, string[]>) {
      // Format the field errors into a readable message
      const message = ValidationError.formatFieldErrors(fieldErrors);
      
      // Call the parent constructor with a 400 status code (Bad Request)
      super(400, message, fieldErrors);
      
      this.name = "ValidationError";
      this.errors = fieldErrors; // Store the field-specific errors
    }
  
    /*
      Utility method to format validation errors into a readable string.
      Example:
      Input: { email: ["Required"], password: ["Too short"] }
      Output: "Email is required, Password is too short"
    */
    static formatFieldErrors(errors: Record<string, string[]>): string {
      const formattedMessages = Object.entries(errors).map(
        ([field, messages]) => {
          // Capitalize the first letter of the field name
          const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
  
          // Customize the message format
          if (messages[0] === "Required") {
            return `${fieldName} is required`;
          } else {
            return messages.join(" and ");
          }
        }
      );
  
      // Join multiple error messages with commas
      return formattedMessages.join(", ");
    }
  }
  
  /*
    NotFoundError is used when a requested resource does not exist.
  */
  export class NotFoundError extends RequestError {
    constructor(resource: string) {
      // Call the parent constructor with a 404 status code (Not Found)
      super(404, `${resource} not found`);
      this.name = "NotFoundError";
    }
  }
  
  /*
    ForbiddenError is used when a user tries to access a restricted resource.
  */
  export class ForbiddenError extends RequestError {
    constructor(message: string = "Forbidden") {
      // Call the parent constructor with a 403 status code (Forbidden)
      super(403, message);
      this.name = "ForbiddenError";
    }
  }
  
  /*
    UnauthorizedError is used when a user is not authenticated.
  */
  export class UnauthorizedError extends RequestError {
    constructor(message: string = "Unauthorized") {
      // Call the parent constructor with a 401 status code (Unauthorized)
      super(401, message);
      this.name = "UnauthorizedError";
    }
  }
  