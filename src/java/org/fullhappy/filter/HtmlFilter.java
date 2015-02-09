/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author AAAA
 */
@WebFilter(filterName = "HtmlFilter", urlPatterns = {"/contact","/products","/products/*"})
public class HtmlFilter implements Filter {


    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpServletRequest = ((HttpServletRequest) request);
        RequestDispatcher dispatcher;
        try {
            String uri = httpServletRequest.getRequestURI().substring(httpServletRequest.getContextPath().length());
            
            if("/contact".equals(uri)){
                dispatcher = httpServletRequest.getRequestDispatcher("/contact.html");
                dispatcher.forward(request, response);
                return;
            }else if(uri.startsWith("/products")){
                String[] uriItems =uri.substring(1).split("/");
                if(uriItems.length<=2){
                     dispatcher = httpServletRequest.getRequestDispatcher("/products.html");
                }else /*if(uriItems.length==2)*/{
                    dispatcher = httpServletRequest.getRequestDispatcher("/detail.html");
                }              
                dispatcher.forward(request, response);
                return;
            }else{
                chain.doFilter(request, response);
            }
        } catch (ServletException | IOException t) {
            t.printStackTrace();
        }

    }

    @Override
    public void destroy() {
    }
    @Override
    public void init(FilterConfig filterConfig) {
     
    }

    



}
