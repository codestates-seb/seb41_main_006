package com.mainproject.server.utils;

import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.Arrays;

@Component
public class CustomBeanUtils<S, D> {
    public D copyNonNullProperties(S source, D destination) {
        if (source == null || destination == null) {
            return null;
        }

        BeanWrapperImpl src = new BeanWrapperImpl(source);
        BeanWrapperImpl dest = new BeanWrapperImpl(destination);

        /*DTO에 선언된 필드와 엔티티에 있는 필드가 동일한 경우에 대해서
        * null 값이 들어오면 엔티티 필드에 null을 할당하고
        * 다른 값으로 수정된 값이 들어왔다면 엔티티 필드에 수정된 값으로 할당한다*/
        for (final Field property : source.getClass().getDeclaredFields()) {
            Object sourceProperty = src.getPropertyValue(property.getName());
            /*DTO에 있는 필드와 엔티티에 있는 필드가 동일한 경우*/
            if (Arrays.stream(destination.getClass().getDeclaredFields())
                    .anyMatch(field -> field.getName().equals(property.getName()))) {

                Object destProperty = dest.getPropertyValue(property.getName());
                if (sourceProperty != null && !sourceProperty.equals(destProperty)) {
                    dest.setPropertyValue(property.getName(), sourceProperty);

                }else if (sourceProperty == null) {
                    dest.setPropertyValue(property.getName(), null);
                }
            }
        }
        return destination;
    }
}
