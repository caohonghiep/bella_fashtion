package org.fullhappy.rest;

import java.lang.reflect.Array;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ParseEngine {

	private static final Map<Class<?>, Class<?>> PRIMITIVES_TO_WRAPPERS = new HashMap<Class<?>, Class<?>>();
	private static Logger logger = Logger.getLogger(ParseEngine.class.getName());
	static {
		PRIMITIVES_TO_WRAPPERS.put(boolean.class, Boolean.class);
		PRIMITIVES_TO_WRAPPERS.put(byte.class, Byte.class);
		PRIMITIVES_TO_WRAPPERS.put(char.class, Character.class);
		PRIMITIVES_TO_WRAPPERS.put(double.class, Double.class);
		PRIMITIVES_TO_WRAPPERS.put(float.class, Float.class);
		PRIMITIVES_TO_WRAPPERS.put(int.class, Integer.class);
		PRIMITIVES_TO_WRAPPERS.put(long.class, Long.class);
		PRIMITIVES_TO_WRAPPERS.put(short.class, Short.class);
		PRIMITIVES_TO_WRAPPERS.put(void.class, Void.class);
	}

	@SuppressWarnings("unchecked")
	public static <T, V> V[] parseValue(Class<V> targetClass, T[] sourceValue) throws UnsupportParseMethod,
			ParseException {
		int len = sourceValue.length;
		V[] objects = null;
		try {
			objects = (V[]) Array.newInstance(targetClass, len);
		} catch (ClassCastException e) {
			if (targetClass.isPrimitive()) {
				throw new UnsupportParseMethod("not support parse with array " + targetClass.getName()
						+ "[], Must use array " + wrap(targetClass) + "[]");
			} else
				throw new ParseException("");
		}
		for (int i = 0; i < len; i++) {
			T t = sourceValue[i];
			objects[i] = parseValue(targetClass, t);
		}
		return objects;
	}

	@SuppressWarnings({ "unchecked" })
	public static <T, V> V parseValue(Class<V> targetClass, T sourceValue) throws UnsupportParseMethod, ParseException {
		if (sourceValue == null) {
			return null;
		} else if (Support.checkSubClass(targetClass, sourceValue.getClass())) {
			return (V) sourceValue;
		}

		String methodName = "parse" + sourceValue.getClass().getSimpleName() + "To" + targetClass.getSimpleName();
		Method method = null;
		try {
			method = ParseEngine.class.getDeclaredMethod(methodName, sourceValue.getClass());
		} catch (Exception e) {
			throw new ParseEngine.UnsupportParseMethod("not found mothod " + methodName + "in Class "
					+ ParseEngine.class.getName());
		}
		V object = null;
		if (method != null) {
			try {
				object = (V) method.invoke(null, sourceValue);
			} catch (Exception e) {
				throw new ParseEngine.ParseException("not parse \"" + sourceValue + "\" to " + targetClass.getName());
			}
		} else {
			throw new ParseEngine.UnsupportParseMethod("not found mothod " + methodName + "in Class "
					+ ParseEngine.class.getName());
		}
		return object;
	}

	@SuppressWarnings("unchecked")
	private static <T> Class<T> wrap(Class<T> c) {
		return c.isPrimitive() ? (Class<T>) PRIMITIVES_TO_WRAPPERS.get(c) : c;
	}

	// @SuppressWarnings("unused")
	// private static Date parseStringToDate(String str) {
	// try {
	// return Utility.getDateFromString(str);
	// } catch (ParseException e) {
	// return null;
	// }
	// }

	@SuppressWarnings("unused")
	private static int parseStringToint(String str) {
		return Integer.parseInt(str);
	}

	@SuppressWarnings("unused")
	private static Integer parseStringToInteger(String str) {
		return Integer.parseInt(str);
	}

	@SuppressWarnings("unused")
	private static long parseStringTolong(String str) {
		return Long.parseLong(str);
	}

	@SuppressWarnings("unused")
	private static Long parseStringToLong(String str) {
		return Long.parseLong(str);
	}

        
        @SuppressWarnings("unused")
	private static Boolean parseStringToboolean(String str) {
		return "true".equalsIgnoreCase(str);
	}
        
        @SuppressWarnings("unused")
	private static Boolean parseStringToBoolean(String str) {
		return "true".equalsIgnoreCase(str);
	}
        
	public static class UnsupportParseMethod extends Exception {
		private static final long serialVersionUID = 1L;
		private String message;

		public UnsupportParseMethod(String string) {
			logger.log(Level.INFO, string);
			message = string;
		}

		public String getMessage() {
			return message;
		}
	}

	public static class ParseException extends Exception {
		private static final long serialVersionUID = 1L;
		private String message;

		public ParseException(String string) {
			logger.log(Level.INFO, string);
			message = string;
		}

		public String getMessage() {
			return message;
		}
	}

}
