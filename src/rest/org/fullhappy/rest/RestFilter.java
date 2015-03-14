package org.fullhappy.rest;

import java.io.IOException;
import java.io.InputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Array;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.fullhappy.rest.ParseEngine.ParseException;
import org.fullhappy.rest.ParseEngine.UnsupportParseMethod;
import org.fullhappy.rest.annotation.FormParam;
import org.fullhappy.rest.annotation.Path;
import org.fullhappy.rest.annotation.GET;
import org.fullhappy.rest.annotation.POST;
import org.fullhappy.rest.annotation.PUT;
import org.fullhappy.rest.annotation.DELETE;
import org.fullhappy.rest.annotation.PathParam;
import org.fullhappy.rest.annotation.Produces;
import org.fullhappy.rest.exceptions.BadParameterException;

/**
 * Servlet Filter implementation class RestFilter
 */
@WebFilter(filterName = "/RestFilter", urlPatterns = "/rest/*")
public class RestFilter implements Filter {

    private static final String DEFAULT_PRODUCES_CONTENT_TYPE = MediaType.TEXT_PLAIN;
    private static HashMap<String, Object> restEntitys = new HashMap<String, Object>();
    private String prefixURL = "/rest";
    private Logger logger = Logger.getLogger(RestFilter.class.getName());

    /**
     * Default constructor.
     */
    public RestFilter() {
        // TODO Auto-generated constructor stub
    }

    /**
     * @see Filter#destroy()
     */
    public void destroy() {
        // TODO Auto-generated method stub
    }

    /**
     * @see Filter#init(FilterConfig)
     */
    public void init(FilterConfig fConfig) throws ServletException {
        Path pathAnnotation;
        String key = null;
        String entityPath;
        Object entity = null;
        String entitiesPackage = getEntitiesPackage();
        ArrayList<Class<?>> classes = Support
                .getClassesFromPackage(entitiesPackage);
        for (Class<?> class1 : classes) {
            Annotation annotation = class1.getAnnotation(Path.class);

            if (annotation instanceof Path) {
                pathAnnotation = (Path) annotation;
                entityPath = pathAnnotation.value();

                entityPath = entityPath.substring(1);

                if (entityPath.indexOf('/') == 0) {
                    entityPath = entityPath.substring(1);
                } else {
                    key = entityPath;
                }

                try {
                    entity = class1.newInstance();
                } catch (InstantiationException e) {
                    logger.log(Level.INFO, "Not create \"" + class1.getName()
                            + "\" with path \"" + entityPath + "\" ");
                } catch (IllegalAccessException e) {
                    logger.log(Level.INFO, "Not create \"" + class1.getName()
                            + "\" with path \"" + entityPath + "\" ");
                }
                restEntitys.put(key, entity);
            }
        }
    }

    private String getEntitiesPackage() {
        String entitiesPackage;
        try {
            Properties properties = new Properties();
            InputStream inputStream = RestFilter.class
                    .getResourceAsStream("/rest_config.properties");
            if (null == inputStream) {
                throw new RuntimeException(
                        "not found rest_config.properties file");
            }
            properties.load(inputStream);
            entitiesPackage = properties.getProperty("entities_package");
            if ("".equals(entitiesPackage)) {
                throw new RuntimeException(
                        "You must put \"entities_package\" in rest_config.properties file");
            }
            return entitiesPackage;
        } catch (IOException e1) {
            throw new RuntimeException(e1.getCause());
        }

    }

    /**
     * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
     */
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        request.setCharacterEncoding("UTF-8");
        if (!validate(req)) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        HashMap<String, Object> valuesInRequest = getValueInRequest(req);
        String[] pathItems = getPathItemsFromRequest(req);
        if (pathItems.length < 2) {
            res.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
        Object entity = restEntitys.get(pathItems[0]);
        if (entity == null) {
             res.setStatus(HttpServletResponse.SC_NOT_FOUND);
             logger.log(Level.INFO, "not found url: \"{0}\" ", 
                    new Object[]{joinString(pathItems, "/")});
            return;
        }
        Method method = getMethodWithPath(entity, pathItems[1], req.getMethod());
        if (method == null) {
             res.setStatus(HttpServletResponse.SC_NOT_FOUND);
             logger.log(Level.INFO, "request url: \"{0}\" does not match with any method in Class {1}", 
                    new Object[]{joinString(pathItems, "/"),entity.getClass().getName()});
            return;
        }
        String[] keysInPath = getKeysInPath(method);        
        if (keysInPath.length != pathItems.length) {   
             res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            logger.log(Level.INFO, "request url: \"{0}\" does not match with \"{1}\" in Class {2}", 
                    new Object[]{joinString(pathItems, "/").substring(joinString(pathItems, "/").indexOf("/")), joinString(keysInPath, "/"),entity.getClass().getName()});
            return;
        }
        
//        boolean[] notNullStatus = getNullStatus(method);
        
        HashMap<String, Object> valuesInPath = getValueInPath(keysInPath, pathItems);
        valuesInPath.putAll(valuesInRequest);

        Object[] values;
        try {
            values = standardizeValues(method, valuesInPath);
        } catch (BadParameterException e1) {
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        String content = "";
        try {
            content = (String) method.invoke(entity, values);
        } catch (IllegalArgumentException | IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.getCause().printStackTrace();
        }

        outputValues(res, method, content);

    }

    private void outputValues(HttpServletResponse res, Method method, String content) throws IOException {
        String contentType = getContentType(method);
        res.setCharacterEncoding("UTF-8");
        res.setContentType(contentType);
        res.getWriter().println(content);
    }

    private String getContentType(Method method) {
        String contentType = DEFAULT_PRODUCES_CONTENT_TYPE;
        Annotation annotation = method.getAnnotation(Produces.class);
        if (annotation instanceof Produces) {
            contentType = ((Produces) annotation).value();
        }
        return contentType;
    }

    private Object[] standardizeValues(Method method,
            HashMap<String, Object> valuesInPath) throws BadParameterException {
        String[] params = getParameterOfParameterAnnotations(method);
        Object[] values = sortValues(params, valuesInPath);
        Type[] parameterTypes = method.getGenericParameterTypes();

        try {
            values = parseValues(parameterTypes, values);
        } catch (BadParameterException e1) {
            logger.log(Level.INFO, "parameter "
                    + params[e1.getIndexParameter()] + " is invalid");
            throw e1;
        }
        return values;
    }

    private String[] getPathItemsFromRequest(HttpServletRequest req) {
        String servletPath = req.getServletPath();
        servletPath = servletPath.substring(prefixURL.length(),
                servletPath.length());
        return splitPath(servletPath);
    }

    private Object[] sortValues(String[] params,
            HashMap<String, Object> mapValues) {
        int leng = params.length;
        Object[] values = new Object[leng];
        for (int i = 0; i < leng; i++) {
            values[i] = mapValues.get(params[i]);
        }
        return values;
    }

    private HashMap<String, Object> getValueInPath(String[] keys,
            String[] Values) {

        HashMap<String, Object> p = new HashMap<String, Object>();
        for (int i = 0; i < keys.length; i++) {
            String key = keys[i];
            if (key.length() > 2 && key.charAt(0) == '{'
                    && key.charAt(key.length() - 1) == '}') {
                key = key.substring(1, key.length() - 1);
                p.put(key, Values[i]);
            }
        }
        return p;
    }

    private String[] getKeysInPath(Method method) {
        String[] pathItem = {};
        Annotation annotation = method.getAnnotation(Path.class);
        if (annotation instanceof Path) {
            String path = ((Path) annotation).value();
            pathItem = path.split("/");
        }
        return pathItem;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    private <T> Object[] parseValues(Type[] targetTypes, Object[] sourceValue)
            throws BadParameterException {

        int length = sourceValue.length;
        Object[] targetValues = new Object[length];
        Object value = null;

        for (int i = 0; i < length; i++) {
            if (sourceValue[i] == null) {
                targetValues[i] = sourceValue[i];
                continue;
            }
            if (((Class) (targetTypes[i])).isArray()
                    && !isArray(sourceValue[i])) {
                Object o = sourceValue[i];
                sourceValue[i] = (T[]) Array.newInstance(o.getClass(), 1);
                Array.set(sourceValue[i], 0, o);
            }

            if (Support.checkSubClass((Class) (targetTypes[i]),
                    (sourceValue[i]).getClass())) {
                value = sourceValue[i];
            } else if (!((Class) (targetTypes[i])).isArray()) {
                try {
                    value = ParseEngine.parseValue(
                            (Class) (targetTypes[i]), sourceValue[i]);
                } catch (UnsupportParseMethod e) {
                    throw new BadParameterException(i);
                } catch (ParseException e) {
                    throw new BadParameterException(i);
                }
            } else {
                T[] sourceValueArray = (T[]) sourceValue[i];
                Class targetType = ((Class) (targetTypes[i]))
                        .getComponentType();
                try {
                    value = ParseEngine.parseValue(targetType,
                            sourceValueArray);
                } catch (Exception e) {
                    throw new BadParameterException(i, e.getMessage());
                }
            }
            targetValues[i] = value;
        }

        return targetValues;
    }

    private boolean isArray(final Object obj) {
        return obj instanceof Object[] || obj instanceof boolean[]
                || obj instanceof byte[] || obj instanceof short[]
                || obj instanceof char[] || obj instanceof int[]
                || obj instanceof long[] || obj instanceof float[]
                || obj instanceof double[];
    }

    private HashMap<String, Object> getValueInRequest(HttpServletRequest req) {
        HashMap<String, Object> p = new HashMap<String, Object>();
        boolean isPart = ServletFileUpload.isMultipartContent(req);
        if (isPart) {
            try {
                FileItemFactory factory = new DiskFileItemFactory();
                ServletFileUpload upload = new ServletFileUpload(factory);
                List<FileItem> items = upload.parseRequest(req);
                Object fieldValue;
                // iterate through form fields
                for (FileItem item : items) {
                    if (item.isFormField()) { // text fields, etc...;
                        fieldValue = item.getString();
                    } else { // file fields
                        fieldValue = item;
                    }
                    putObjectInToMap(p, item.getFieldName(), fieldValue);
                }

            } catch (FileUploadException e) {
                e.printStackTrace();
            }

        } else {
            Enumeration<String> arameterNames = req.getParameterNames();
            while (arameterNames.hasMoreElements()) {
                String str = (String) arameterNames.nextElement();
                p.put(str, req.getParameter(str));
            }
        }

        // http://stackoverflow.com/questions/10348040/file-doesnt-upload-after-i-handled-the-text-field-of-the-same-form
        return p;
    }

    @SuppressWarnings({"unchecked"})
    private <T> void putObjectInToMap(HashMap<String, Object> p, String key,
            T value) {
        Object b = p.get(key);
        if (b == null) {// not exist
            p.put(key, value);
        } else if (b instanceof Object[]) { // exist as array
            T[] objects = (T[]) b;
            T[] object1s = (T[]) Array.newInstance(objects.getClass()
                    .getComponentType(), objects.length + 1);
            System.arraycopy(objects, 0, object1s, 0, objects.length);
            object1s[objects.length] = value;
            p.put(key, object1s);
        } else {// exist as object
            T[] object1s = (T[]) Array.newInstance(b.getClass(), 2);
            object1s[0] = (T) b;
            object1s[1] = value;
            p.put(key, object1s);
        }

    }

    private String[] getParameterOfParameterAnnotations(Method method) {
        Annotation[][] annotations = method.getParameterAnnotations();
        int len = annotations.length;
        String[] params = new String[len];
        for (int i = 0; i < len; i++) {
            Annotation[] annotations2 = annotations[i];
            if (annotations2.length > 0 && annotations2[0] instanceof FormParam) {
                params[i] = ((FormParam) annotations2[0]).value();
            } else if (annotations2.length > 0
                    && annotations2[0] instanceof PathParam) {
                params[i] = ((PathParam) annotations2[0]).value();
            } else {
                params[i] = null;
            }
        }
        return params;
    }

    private Method getMethodWithPath(Object entity, String path) {
        Method[] methods = entity.getClass().getDeclaredMethods();

        for (Method method : methods) {
            Annotation annotation = method.getAnnotation(Path.class);
            if (annotation instanceof Path) {
                Path path2 = (Path) annotation;
                if (path2.value().equals("/" + path)
                        || path2.value().indexOf("/" + path + "/") == 0) {
                    return method;
                }
            }
        }
        return null;
    }

    private Method getMethodWithPath(Object entity, String path, String requestMethod) {
        Method[] methods = entity.getClass().getDeclaredMethods();
        List<Method> re;
        re = new ArrayList<>(0);
        for (Method method : methods) {
            Annotation pathAnnotation = method.getAnnotation(Path.class);
            if (pathAnnotation instanceof Path) {
                Path path2 = (Path) pathAnnotation;
                if (path2.value().equals("/" + path)
                        || path2.value().indexOf("/" + path + "/") == 0) {
                    re.add(method);
                }
            }
        }
        if (re.isEmpty()) {
            return null;
        } else {
            for (Method m : re) {
                Annotation pathAnnotation;
                switch (requestMethod) {
                    case "GET":
                        pathAnnotation = m.getAnnotation(GET.class);
                        if (pathAnnotation instanceof GET) {
                            return m;
                        }
                        break;
                    case "POST":
                        pathAnnotation = m.getAnnotation(POST.class);
                        if (pathAnnotation instanceof POST) {
                            return m;
                        }
                        break;
                    case "PUT":
                        pathAnnotation = m.getAnnotation(PUT.class);
                        if (pathAnnotation instanceof PUT) {
                            return m;
                        }
                        break;
                    case "DELETE":
                        pathAnnotation = m.getAnnotation(DELETE.class);
                        if (pathAnnotation instanceof DELETE) {
                            return m;
                        }
                        break;
                }
            }
            if (re.size() == 1) {
                return re.get(0);
            } else {
                return null;
            }
        }

    }

    private String[] splitPath(String path) {
        if (path.indexOf('/') == 0) {
            path = path.substring(1);
        }

        if (path.lastIndexOf('/') == path.length() - 1) {
            path = path.substring(0, path.length() - 1);
        }

        return path.split("/");
    }

    private boolean validate(HttpServletRequest req) {
        String referer = req.getHeader("Referer");// http://localhost:8080/rest_test/index.html
        req.getRequestURI();// /rest_test/rest/resources/get_name
        req.getContextPath();// /rest_test
        req.getLocalAddr(); // 127.0.0.1
        req.getLocalName();// 127.0.0.1
        req.getMethod();// GET
        req.getRequestURI();// /rest_test/rest/resources/get_name
        req.getRequestURL();// http://localhost:8080/rest_test/rest/resources/get_name
        req.getServerName();// localhost
        req.getServletPath();// /rest/resources/get_name

        return true;
    }

    private boolean checkRequireMethod(Method re, String requestMethod) {
        //TODO
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private String joinString(String[] strings, String separator) {
        StringBuilder result = new StringBuilder();
        for (String string : strings) {
            result.append(string);
            result.append(separator);
        }
        return result.toString();
    }

}
