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

/**
 *
 * @author AAAA
 */
@Entity
@Table(name = "site_info")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SiteInfo.findAll", query = "SELECT s FROM SiteInfo s"),
    @NamedQuery(name = "SiteInfo.findById", query = "SELECT s FROM SiteInfo s WHERE s.id = :id"),
    @NamedQuery(name = "SiteInfo.findByWesiteName", query = "SELECT s FROM SiteInfo s WHERE s.wesiteName = :wesiteName"),
    @NamedQuery(name = "SiteInfo.findByEmail", query = "SELECT s FROM SiteInfo s WHERE s.email = :email"),
    @NamedQuery(name = "SiteInfo.findByPhone", query = "SELECT s FROM SiteInfo s WHERE s.phone = :phone"),
    @NamedQuery(name = "SiteInfo.findByAdsress", query = "SELECT s FROM SiteInfo s WHERE s.adsress = :adsress"),
    @NamedQuery(name = "SiteInfo.findByLocation", query = "SELECT s FROM SiteInfo s WHERE s.location = :location"),
    @NamedQuery(name = "SiteInfo.findByLogoUrl", query = "SELECT s FROM SiteInfo s WHERE s.logoUrl = :logoUrl")})
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
    @Column(name = "adsress")
    private String adsress;
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
    @Column(name = "safe_off_message")
    private String safeOffMessage;

    public SiteInfo() {
    }

    public SiteInfo(Boolean id) {
        this.id = id;
    }

    public SiteInfo(Boolean id, String wesiteName, String email, String phone, String adsress, String location, String logoUrl, String welcomeMessage, String newMessage, String safeOffMessage) {
        this.id = id;
        this.wesiteName = wesiteName;
        this.email = email;
        this.phone = phone;
        this.adsress = adsress;
        this.location = location;
        this.logoUrl = logoUrl;
        this.welcomeMessage = welcomeMessage;
        this.newMessage = newMessage;
        this.safeOffMessage = safeOffMessage;
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

    public String getAdsress() {
        return adsress;
    }

    public void setAdsress(String adsress) {
        this.adsress = adsress;
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
        return safeOffMessage;
    }

    public void setSafeOffMessage(String safeOffMessage) {
        this.safeOffMessage = safeOffMessage;
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
    
}
