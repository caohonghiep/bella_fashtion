package org.fullhappy.rest.entities;

import java.util.ArrayList;
import java.util.List;

import javax.xml.ws.FaultAction;

import org.apache.commons.fileupload.FileItem;
import org.fullhappy.rest.MediaType;
import org.fullhappy.rest.annotation.FormParam;
import org.fullhappy.rest.annotation.Path;
import org.fullhappy.rest.annotation.PathParam;
import org.fullhappy.rest.annotation.Produces;


@Path("/resources")
public class Resources {
	
	@Path("/get_name/{id}")
	@Produces(MediaType.TEXT_HTML)
	public  String getName(
			@FormParam("name") String[] name,
			@FormParam("aname") String aname,
			@FormParam("old") Integer[] old, 
			@FormParam("year") Long year,
			@FormParam("file") FileItem[] fileItem, @PathParam("id") String id){
		return name.toString()+old[100];
	}
	
	
	
 }

