/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.rest.entities;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.fullhappy.dao.ItemJpaController;
import org.fullhappy.entities.Item;
import org.fullhappy.rest.MediaType;
import org.fullhappy.rest.annotation.FormParam;
import org.fullhappy.rest.annotation.GET;
import org.fullhappy.rest.annotation.POST;
import org.fullhappy.rest.annotation.Path;
import org.fullhappy.rest.annotation.PathParam;
import org.fullhappy.rest.annotation.Produces;
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

        if (items == null || items.getCategoryId() != categoryId) {
            return "";
        } else {
            return items.toJSON().toString();
        }
    }

    @POST
    @Path("/item/{categoryId}/{itemId}")
    @Produces(MediaType.APPLICATION_JSON)
    public String updateItem(@PathParam("categoryId") Long categoryId, @PathParam("itemId") Long itemId,
            @FormParam("displayId") String displayId, @FormParam("title") String title, @FormParam("price") Integer price,
            @FormParam("description") String description, @FormParam("inNew") String inNew, 
            @FormParam("inPromotion") String inPromotion) {

        Item item = itemJpaController.findItem(itemId);
        if (displayId != null) {
            item.setDisplayId(displayId);
        }
        if (title != null) {
            item.setTitle(title);
        }
        if (price != null) {
            item.setPrice(price);
        }
        if (description != null) {
            item.setDescription(description);
        }
        
        if(inNew!=null){
            item.setInNew("true".equalsIgnoreCase(inNew));
            item.setInPromotion(null);
        }
        
        if(inPromotion!=null){
            if(inPromotion.trim().length()==0){
                inPromotion=null;
            }
            item.setInPromotion(inPromotion);
            item.setInNew(false);
        }
        
        try {
            itemJpaController.edit(item);
        } catch (Exception ex) {
            Logger.getLogger(ItemService.class.getName()).log(Level.SEVERE, null, ex);
            if (displayId != null && ex.getMessage().contains("Duplicate entry")) {
                return "false";
            }
        }
        return "true";
    }

    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public String getItem(@PathParam("categoryId") Long categoryId) {

        Item item = new Item();
        item.setCategoryId(categoryId);
        item.setDisplayId("Đang cập nhật Mã Sản Phẩm " + System.currentTimeMillis());
        item.setTitle("Đang cập nhật Tên Sản Phẩm");
        item.setAvatars("");
        item.setPrice(0);
        item.setDescription("Đang cập nhật Mô Tả Sản phẩm.");
        item.setInPromotion("");
        item.setCreatedTime(System.currentTimeMillis());
        try {
            itemJpaController.create(item);
            return "{id:'" + item.getId() + "'}";
        } catch (Exception ex) {
            Logger.getLogger(ItemService.class.getName()).log(Level.SEVERE, null, ex);
            return "{id:'0'}";
        }
    }

    @POST
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteItem(@FormParam("itemId") Long itemId) {

        Item item = itemJpaController.findItem(itemId);
        item.setDeletedTime(System.currentTimeMillis());
        try {
            itemJpaController.edit(item);
        } catch (Exception ex) {
            Logger.getLogger(ItemService.class.getName()).log(Level.SEVERE, null, ex);
            return "false";
        }
        return "true";
    }
}
