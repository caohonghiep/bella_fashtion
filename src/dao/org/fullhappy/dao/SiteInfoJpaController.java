/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.dao;

import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.fullhappy.dao.exceptions.NonexistentEntityException;
import org.fullhappy.dao.exceptions.PreexistingEntityException;
import org.fullhappy.entities.SiteInfo;

/**
 *
 * @author AAAA
 */
public class SiteInfoJpaController implements Serializable {

    public SiteInfoJpaController(EntityManagerFactory emf) {
        this.emf = emf;
    }
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public void create(SiteInfo siteInfo) throws PreexistingEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            em.persist(siteInfo);
            em.getTransaction().commit();
        } catch (Exception ex) {
            if (findSiteInfo(siteInfo.getId()) != null) {
                throw new PreexistingEntityException("SiteInfo " + siteInfo + " already exists.", ex);
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(SiteInfo siteInfo) throws NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            siteInfo = em.merge(siteInfo);
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                Boolean id = siteInfo.getId();
                if (findSiteInfo(id) == null) {
                    throw new NonexistentEntityException("The siteInfo with id " + id + " no longer exists.");
                }
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void destroy(Boolean id) throws NonexistentEntityException {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            SiteInfo siteInfo;
            try {
                siteInfo = em.getReference(SiteInfo.class, id);
                siteInfo.getId();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The siteInfo with id " + id + " no longer exists.", enfe);
            }
            em.remove(siteInfo);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<SiteInfo> findSiteInfoEntities() {
        return findSiteInfoEntities(true, -1, -1);
    }

    public List<SiteInfo> findSiteInfoEntities(int maxResults, int firstResult) {
        return findSiteInfoEntities(false, maxResults, firstResult);
    }

    private List<SiteInfo> findSiteInfoEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(SiteInfo.class));
            Query q = em.createQuery(cq);
            if (!all) {
                q.setMaxResults(maxResults);
                q.setFirstResult(firstResult);
            }
            return q.getResultList();
        } finally {
            em.close();
        }
    }

    public SiteInfo findSiteInfo(Boolean id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(SiteInfo.class, id);
        } finally {
            em.close();
        }
    }

    public int getSiteInfoCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<SiteInfo> rt = cq.from(SiteInfo.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
