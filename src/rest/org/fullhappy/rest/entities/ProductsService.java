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
@Path("/products")
public class ProductsService {

    private final ItemJpaController itemJpaController = new ItemJpaController();

    @GET
    @Path("/shortInfoList/{categoryId}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getShortInfoList(@PathParam("categoryId") Long categoryId, @FormParam("start") int startPosition, @FormParam("max") int maxResult) {
        List<Item> items = itemJpaController.findByCategoryId(categoryId, startPosition, maxResult);
        JSONArray jSONArray = new JSONArray();
        for (Item item : items) {
            try {
                jSONArray.put(item.toShortInfoJSON());
            } catch (JSONException ex) {
                Logger.getLogger(ProductsService.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return jSONArray.toString();
    }

    @GET
    @Path("/inNewShortInfoList")
    @Produces(MediaType.APPLICATION_JSON)
    public String getInNewshortInfoList(@FormParam("start") int startPosition, @FormParam("max") int maxResult) {
        List<Item> items = itemJpaController.findByInNew(startPosition, maxResult);
        JSONArray jSONArray = new JSONArray();
        for (Item item : items) {
            try {
                jSONArray.put(item.toShortInfoJSON());
            } catch (JSONException ex) {
                Logger.getLogger(ProductsService.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return jSONArray.toString();
    }
    
    @GET
    @Path("/safeOffShortInfoList")
    @Produces(MediaType.APPLICATION_JSON)
    public String safeOffShortInfoList(@FormParam("start") int startPosition, @FormParam("max") int maxResult) {
        List<Item> items = itemJpaController.findByInPromotion(startPosition, maxResult);
        JSONArray jSONArray = new JSONArray();
        for (Item item : items) {
            try {
                jSONArray.put(item.toShortInfoJSON());
            } catch (JSONException ex) {
                Logger.getLogger(ProductsService.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return jSONArray.toString();
    }

}
