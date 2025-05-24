package com.wipro.usermangement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	 @ExceptionHandler(UserNotFoundExeption.class)
	    public ResponseEntity<String> handleUserNotFound(UserNotFoundExeption ex) {
	        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);  
	    }

	    @ExceptionHandler(Exception.class)
	    public ResponseEntity<String> handleGenericException(Exception ex) {
	        return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
}
