/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author AAAA
 */
@Entity
@Table(name = "site_info")
public class SiteInfo implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "id")
    private Boolean id;
    @Basic(optional = false)
    @Column(name = "wesite_name")
    private String wesiteName;
    @Basic(optional = false)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @Column(name = "phone")
    private String phone;
    @Basic(optional = false)
    @Column(name = "address")
    private String address;
    @Basic(optional = false)
    @Column(name = "location")
    private String location;
    @Basic(optional = false)
    @Column(name = "logo_url")
    private String logoUrl;
    @Basic(optional = false)
    @Lob
    @Column(name = "welcome_message")
    private String welcomeMessage;
    @Basic(optional = false)
    @Lob
    @Column(name = "new_message")
    private String newMessage;
    @Basic(optional = false)
    @Lob
    @Column(name = "sale_off_message")
    private String saleOffMessage;

    public SiteInfo() {
    }

    public SiteInfo(Boolean id) {
        this.id = id;
    }

    public SiteInfo(Boolean id, String wesiteName, String email, String phone, String address, String location, String logoUrl, String welcomeMessage, String newMessage, String saleOffMessage) {
        this.id = id;
        this.wesiteName = wesiteName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.location = location;
        this.logoUrl = logoUrl;
        this.welcomeMessage = welcomeMessage;
        this.newMessage = newMessage;
        this.saleOffMessage = saleOffMessage;
    }

    public Boolean getId() {
        return id;
    }

    public void setId(Boolean id) {
        this.id = id;
    }

    public String getWesiteName() {
        return wesiteName;
    }

    public void setWesiteName(String wesiteName) {
        this.wesiteName = wesiteName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getWelcomeMessage() {
        return welcomeMessage;
    }

    public void setWelcomeMessage(String welcomeMessage) {
        this.welcomeMessage = welcomeMessage;
    }

    public String getNewMessage() {
        return newMessage;
    }

    public void setNewMessage(String newMessage) {
        this.newMessage = newMessage;
    }

    public String getSafeOffMessage() {
        return saleOffMessage;
    }

    public void setSafeOffMessage(String saleOffMessage) {
        this.saleOffMessage = saleOffMessage;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SiteInfo)) {
            return false;
        }
        SiteInfo other = (SiteInfo) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.fullhappy.entities.SiteInfo[ id=" + id + " ]";
    }

    public JSONObject toJSON() throws JSONException {
        JSONObject jSONObject = new JSONObject();
        jSONObject.put("id", this.id);
        jSONObject.put("address", this.address);
        jSONObject.put("email", this.email);
        jSONObject.put("location", this.location);
        jSONObject.put("wesiteName", this.wesiteName);
        jSONObject.put("saleOffMessage", this.saleOffMessage);
        return jSONObject;
    }

}
