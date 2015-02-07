package org.fullhappy.rest.entities;

import org.fullhappy.rest.annotation.GET;
import org.fullhappy.rest.annotation.NotNull;
import org.fullhappy.rest.annotation.Path;
import org.fullhappy.rest.annotation.PathParam;
 
 
@Path("/hello")
public class HelloWorldService {
 
	@GET
	@Path("/helo1/{param}")
	public String getMsg(@PathParam("param") @NotNull String msg) {
 
		String output = "Jersey say : " + msg;
 
		return output;
 
	}
 
}