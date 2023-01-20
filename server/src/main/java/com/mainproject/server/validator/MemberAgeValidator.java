package com.mainproject.server.validator;

import com.mainproject.server.domain.member.entity.Member;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class MemberAgeValidator implements ConstraintValidator<MemberAge, Member.MemberAge> {
    @Override
    public void initialize(MemberAge constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Member.MemberAge value, ConstraintValidatorContext context) {
        boolean checked = true;
        Member.MemberAge[] values = Member.MemberAge.values();
        if (!(value == null)) {
            checked = Arrays.stream(values).anyMatch(memberAge -> memberAge.name().equals(value.name()));
        }

        return checked;
    }
}
