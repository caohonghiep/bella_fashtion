/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.rest.entities;

import org.fullhappy.dao.ImageJpaController;
import org.fullhappy.dao.exceptions.NonexistentEntityException;
import org.fullhappy.entities.Image;
import org.fullhappy.rest.MediaType;
import org.fullhappy.rest.annotation.POST;
import org.fullhappy.rest.annotation.Path;
import org.fullhappy.rest.annotation.PathParam;
import org.fullhappy.rest.annotation.Produces;

/**
 *
 * @author AAAA
 */
@Path("/image")
public class ImageService {

    private final ImageJpaController imageJpaController = new ImageJpaController();

    @POST
    @Path("/add")
    @Produces(MediaType.APPLICATION_JSON)
    public String add(@PathParam("colorId") Long colorId, @PathParam("urls") String urls) throws Exception  {
        Image image = new Image();
        image.setColorId(colorId);
        image.setUrls(urls);
        imageJpaController.create(image);
        return "{id:'"+image.getId()+"'}";
        
    }

    @POST
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public String delete(@PathParam("imageId") Long imageId) throws NonexistentEntityException {
        imageJpaController.destroy(imageId);
        return "{id:'"+imageId+"'}";
    }
}
