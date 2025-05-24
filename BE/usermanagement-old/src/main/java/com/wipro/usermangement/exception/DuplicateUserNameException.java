package com.wipro.usermangement.exception;

public class DuplicateUserNameException extends RuntimeException {
/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

public DuplicateUserNameException(String message) {
	super(message);
}
}
