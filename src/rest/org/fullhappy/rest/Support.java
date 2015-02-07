package org.fullhappy.rest;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Set;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

public class Support {
	public static ArrayList<Class<?>> getClassesFromPackage(String packageName) {

		ArrayList<Class<?>> classes = new ArrayList<Class<?>>();
		
		File directory = null;
		
		String relPath = packageName.replace('.', '/');

		URL url = Thread.currentThread().getContextClassLoader().getResource(relPath);//ClassLoader.getSystemClassLoader().getResource(relPath);

		if (url == null) {
			throw new RuntimeException("No resource for " + relPath);
		}

		try {
			directory = new File(url.toURI());
		} catch (URISyntaxException e) {
			throw new RuntimeException(packageName + " (" + url
					+ ") does not appear to be a valid URL / URI."
					+ "  Strange, since we got it from the system...", e);
		} catch (IllegalArgumentException e) {
			directory = null;
		}
		
		if (directory != null && directory.exists()) {
			// Get the list of the files contained in the package
			String[] files = directory.list();
			for (int i = 0; i < files.length; i++) {
				// we are only interested in .class files
				if (files[i].endsWith(".class")) {
					// removes the .class extension
					String className = packageName + '.'
							+ files[i].substring(0, files[i].length() - 6);
					try {
						classes.add(Class.forName(className));
					} catch (ClassNotFoundException e) {
						throw new RuntimeException(
								"ClassNotFoundException loading " + className);
					}
				}
			}
		} 
		return classes;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static boolean checkSubClass(Class superClass, Class childClass) {
		try {
			childClass.asSubclass(superClass);
			return true;
		} catch (ClassCastException e) {
			return false;
		}

	}
	
}
