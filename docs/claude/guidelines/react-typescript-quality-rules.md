# React/TypeScript Quality Rules

## Overview

This document defines mandatory quality rules for React/TypeScript development in the Skills Evaluation design system. These rules MUST be applied to EVERY development task to ensure maintainability, performance, and consistency.

**Critical Rules**: These rules are automatically enforced by Claude AI during development.

---

## 🚨 Component Size & Complexity Rules

### 1. Component Size Limit
- **Maximum Lines**: 180 lines per component file
- **Enforcement**: MANDATORY - No exceptions
- **Action Required**: If exceeded, component MUST be broken down

### 2. Function Complexity Limit
- **Maximum Cyclomatic Complexity**: 11 per function
- **Measurement**: Count decision points (if, switch, loops, ternary operators)
- **Action Required**: Extract functions or use early returns to reduce complexity

### 3. File Size Limit
- **Maximum Lines**: 150-180 lines per file
- **Includes**: All code, imports, exports, but excludes comments
- **Action Required**: Split into multiple files if exceeded

---

## 🔧 TypeScript Quality Rules

### 4. Strict Type Usage
```typescript
// ❌ NEVER - No 'any' types
const handleClick = (event: any) => { };

// ✅ ALWAYS - Proper typing
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { };
```

### 5. Interface Definitions
```typescript
// ✅ ALWAYS - Define interfaces for all props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// ✅ ALWAYS - Use interfaces for component props
const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  // implementation
};
```

### 6. Generic Types Usage
```typescript
// ✅ ALWAYS - Use generics for reusable components
interface SelectProps<T> {
  options: T[];
  value?: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
}
```

---

## ⚛️ React Component Structure Rules

### 7. Functional Components Only
```typescript
// ✅ ALWAYS - Use functional components with hooks
const MyComponent: React.FC<MyComponentProps> = ({ prop1, prop2 }) => {
  const [state, setState] = useState<StateType>(initialState);
  
  return <div>{/* JSX */}</div>;
};
```

### 8. Hook Usage Patterns
```typescript
// ✅ ALWAYS - Destructure props
const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size, 
  disabled, 
  children, 
  onClick,
  ...rest 
}) => {
  // ✅ ALWAYS - Use proper hook dependencies
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  }, [disabled, onClick]);

  // ✅ ALWAYS - Memoize expensive calculations
  const computedClasses = useMemo(() => {
    return cn(baseClasses, variantClasses[variant], sizeClasses[size]);
  }, [variant, size]);

  return (
    <button
      {...rest}
      className={computedClasses}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

---

## 📂 Separation of Concerns Rules

### 9. Component Breakdown Patterns

When a component exceeds 180 lines, break it down using these patterns:

#### A. Extract Sub-Components
```typescript
// ✅ Break down into smaller components
const ButtonIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <span className="button-icon">{icon}</span>
);

const ButtonText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="button-text">{children}</span>
);

const Button: React.FC<ButtonProps> = ({ icon, children, ...props }) => (
  <button {...props}>
    {icon && <ButtonIcon icon={icon} />}
    <ButtonText>{children}</ButtonText>
  </button>
);
```

#### B. Extract Custom Hooks
```typescript
// ✅ Extract state logic into custom hooks
const useButtonState = (disabled?: boolean) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = useCallback(() => {
    if (!disabled) setIsPressed(true);
  }, [disabled]);

  const handleRelease = useCallback(() => {
    setIsPressed(false);
  }, []);

  return {
    isPressed,
    isFocused,
    setIsFocused,
    handlePress,
    handleRelease,
  };
};
```

#### C. Extract Utility Functions
```typescript
// ✅ Move complex logic to utility functions
const getButtonClasses = (
  variant: ButtonVariant,
  size: ButtonSize,
  disabled?: boolean
): string => {
  return cn(
    baseButtonClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && disabledClasses
  );
};
```

---

## 🎯 Performance Rules

### 10. Memoization Requirements
```typescript
// ✅ ALWAYS - Memoize expensive components
const ExpensiveComponent = React.memo<ExpensiveComponentProps>(({ data, config }) => {
  // ✅ ALWAYS - Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => processItem(item, config));
  }, [data, config]);

  // ✅ ALWAYS - Memoize callbacks
  const handleClick = useCallback((id: string) => {
    onItemClick?.(id);
  }, [onItemClick]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onClick={handleClick} />
      ))}
    </div>
  );
});
```

### 11. Ref Forwarding
```typescript
// ✅ ALWAYS - Forward refs for reusable components
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
```

---

## 📊 TanStack Query Rules

### 12. Query Patterns
```typescript
// ✅ ALWAYS - Use proper query patterns
const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof NotFoundError) return false;
      return failureCount < 3;
    },
  });
};

// ✅ ALWAYS - Handle loading and error states
const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: user, isLoading, error } = useUserQuery(userId);

  if (isLoading) return <UserSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <UserNotFound />;

  return <UserDetails user={user} />;
};
```

### 13. Mutation Patterns
```typescript
// ✅ ALWAYS - Use proper mutation patterns with error handling
const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] });
      
      // Show success toast
      toast.success('User updated successfully');
    },
    onError: (error: ApiError) => {
      // Show error toast with retry option
      toastUtils.errorWithRetry(
        'Failed to update user',
        () => mutate(variables)
      );
    },
  });
};
```

---

## 🚀 Component Refactoring Guidelines

### When to Refactor
Refactor immediately when ANY of these conditions are met:

1. **Component exceeds 180 lines**
2. **Function complexity exceeds 11**
3. **File size exceeds 180 lines**
4. **More than 3 useState hooks** (consider useReducer)
5. **More than 5 useEffect hooks** (extract custom hooks)

### Refactoring Patterns

#### Large Component Breakdown
```typescript
// ❌ BEFORE - 300+ line component
const LargeForm: React.FC = () => {
  // 50+ lines of state
  // 100+ lines of handlers
  // 150+ lines of JSX
};

// ✅ AFTER - Broken down into focused components
const FormHeader: React.FC<FormHeaderProps> = ({ title, description }) => { };
const FormFields: React.FC<FormFieldsProps> = ({ fields, values, onChange }) => { };
const FormActions: React.FC<FormActionsProps> = ({ onSubmit, onCancel }) => { };

const Form: React.FC<FormProps> = (props) => {
  const state = useFormState(props);
  const handlers = useFormHandlers(state);

  return (
    <form onSubmit={handlers.handleSubmit}>
      <FormHeader title={props.title} description={props.description} />
      <FormFields fields={props.fields} {...state} {...handlers} />
      <FormActions onSubmit={handlers.handleSubmit} onCancel={props.onCancel} />
    </form>
  );
};
```

#### Complex Logic Extraction
```typescript
// ✅ Extract complex logic into custom hooks
const useComplexCalculation = (input: ComplexInput) => {
  return useMemo(() => {
    // Complex calculation logic
    return calculateComplexValue(input);
  }, [input]);
};

// ✅ Extract event handlers
const useEventHandlers = (props: ComponentProps) => {
  const handleClick = useCallback((event: React.MouseEvent) => {
    // Complex click handling logic
  }, [props.onClick]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    // Complex keyboard handling logic
  }, [props.onKeyDown]);

  return { handleClick, handleKeyDown };
};
```

---

## 📋 Quality Checklist

Before completing ANY component development task, verify:

### TypeScript Quality
- [ ] No `any` types used
- [ ] All props have proper interfaces
- [ ] Generic types used where appropriate
- [ ] Strict mode compliance

### Component Structure
- [ ] Functional component with hooks
- [ ] Props destructured
- [ ] Ref forwarded if needed
- [ ] Display name set

### Performance
- [ ] Expensive components memoized
- [ ] Callbacks memoized with useCallback
- [ ] Expensive calculations memoized with useMemo
- [ ] Proper dependency arrays

### Size & Complexity
- [ ] Component under 180 lines
- [ ] Functions under complexity 11
- [ ] File under 180 lines
- [ ] Logic properly separated

### Testing
- [ ] Unit tests cover all variants
- [ ] Accessibility tests included
- [ ] Edge cases tested
- [ ] Performance tests if needed

### TanStack Query (if applicable)
- [ ] Proper query key structure
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Success feedback provided

---

## 🛠️ Automated Enforcement

These rules are enforced through:

1. **ESLint Configuration**: TypeScript and React rules
2. **TypeScript Compiler**: Strict mode enabled
3. **Claude AI Reviews**: Automatic quality checks during development
4. **Pre-commit Hooks**: Quality gates before commits
5. **CI/CD Pipeline**: Automated quality verification

---

**Document Status**: Active Enforcement Rules  
**Last Updated**: 2025-01-20  
**Review Schedule**: Weekly  
**Owner**: Design System Team  
**Enforcement**: Automated + Manual Review