package org.fullhappy.rest.exceptions;

public class BadParameterException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	int indexParameter;
	String message;
	public BadParameterException(int indexParameter) {
		this.indexParameter = indexParameter;
	}

	public BadParameterException(int indexParameter, String message) {
		this.indexParameter = indexParameter;
		this.message = message;
	} 
	public int getIndexParameter() {
		return indexParameter;
	}

	public void setIndexParameter(int indexParameter) {
		this.indexParameter = indexParameter;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
