/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.dao;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 *
 * @author AAAA
 */
public class EMF {
    private  static EntityManagerFactory emf;
    private  EMF(){}
    public static EntityManagerFactory getInstance(){
        if(emf ==null){
            emf = Persistence.createEntityManagerFactory("bebe3PU");
        }
        return emf;
    }
}
