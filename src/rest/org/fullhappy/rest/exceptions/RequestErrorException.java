package org.fullhappy.rest.exceptions;

public class RequestErrorException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	int status;
	String message;
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

}
