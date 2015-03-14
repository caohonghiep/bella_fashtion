/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.rest.entities;

import org.fullhappy.dao.ColorJpaController;
import org.fullhappy.dao.exceptions.NonexistentEntityException;
import org.fullhappy.entities.Color;
import org.fullhappy.rest.MediaType;
import org.fullhappy.rest.annotation.POST;
import org.fullhappy.rest.annotation.Path;
import org.fullhappy.rest.annotation.PathParam;
import org.fullhappy.rest.annotation.Produces;

/**
 *
 * @author AAAA
 */
@Path("/color")
public class ColorService {

    private final ColorJpaController colorJpaController = new ColorJpaController();

    @POST
    @Path("/add")
    @Produces(MediaType.APPLICATION_JSON)
    public String add(@PathParam("itemId") Long itemId) throws Exception  {
        Color color = new Color();
        color.setItemId(itemId);
        colorJpaController.create(color);
        return "{id:'"+color.getId()+"'}";
        
    }

    @POST
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public String delete(@PathParam("colorId") Long colorId) throws NonexistentEntityException {
        colorJpaController.destroy(colorId);
        return "{id:'"+colorId+"'}";
    }
}
