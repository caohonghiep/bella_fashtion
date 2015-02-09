/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.rest.entities;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.fullhappy.dao.ItemJpaController;
import org.fullhappy.entities.Item;
import org.fullhappy.rest.MediaType;
import org.fullhappy.rest.annotation.FormParam;
import org.fullhappy.rest.annotation.GET;
import org.fullhappy.rest.annotation.Path;
import org.fullhappy.rest.annotation.PathParam;
import org.fullhappy.rest.annotation.Produces;
import org.json.JSONArray;
import org.json.JSONException;

/**
 *
 * @author AAAA
 */
@Path("/items")
public class ItemService {

    private final ItemJpaController itemJpaController = new ItemJpaController();

    @GET
    @Path("/item/{categoryId}/{itemId}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getItem(@PathParam("categoryId") Long categoryId, @PathParam("itemId") Long itemId) throws JSONException {
        Item items = itemJpaController.findItem(itemId);

        if (items ==null || items.getCategoryId() != categoryId) {
            return "";
        } else {
            return items.toJSON().toString();
        }
    }
}
