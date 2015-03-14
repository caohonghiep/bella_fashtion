/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.rest.entities;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.fullhappy.dao.ItemJpaController;
import org.fullhappy.dao.SiteInfoJpaController;
import org.fullhappy.entities.Item;
import org.fullhappy.entities.SiteInfo;
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
@Path("/siteInfo")
public class SiteInfoService {

    private final SiteInfoJpaController siteInfoJpaController = new SiteInfoJpaController();

    @GET
    @Path("/get/{siteId}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getItem(@PathParam("siteId") boolean siteId) throws JSONException {
        SiteInfo siteInfo = siteInfoJpaController.findSiteInfo(true);
        if (siteInfo == null || siteInfo.getId()!= siteId) {
            return "";
        } else {
            return siteInfo.toJSON().toString();
        }
    }
}
