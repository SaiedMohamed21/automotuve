-- =============================================================
-- SQL SCRIPT: CREATE EXACTLY ONE OWNER ACCOUNT (saied@owner.com)
-- System: SOS Motor Works (ASP.NET Core Identity)
-- Database: StarAutoCenter
-- =============================================================

USE [StarAutoCenter];
GO

BEGIN TRANSACTION;

BEGIN TRY
    DECLARE @OwnerEmail NVARCHAR(256) = N'saied@owner.com';
    -- Valid ASP.NET Core Identity PBKDF2 V3 Hash for password "12345"
    DECLARE @PasswordHash NVARCHAR(MAX) = N'AQAAAAIAAYagAAAAENWzdu84sKS5cumzyG8qWS6ZxxpmYvTrB/5Tm2KvOjZZInxFLx4oNif0Us2VdUV4KQ==';
    DECLARE @OwnerUserId NVARCHAR(450);
    DECLARE @OwnerRoleId NVARCHAR(450);

    -- 1. Ensure 'Owner' role exists in AspNetRoles
    IF NOT EXISTS (SELECT 1 FROM [AspNetRoles] WHERE [Name] = 'Owner')
    BEGIN
        SET @OwnerRoleId = NEWID();
        INSERT INTO [AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp])
        VALUES (@OwnerRoleId, N'Owner', N'OWNER', NEWID());
    END
    ELSE
    BEGIN
        SELECT TOP 1 @OwnerRoleId = [Id] FROM [AspNetRoles] WHERE [Name] = 'Owner';
    END

    -- 2. Clean up any OTHER Owner accounts to ensure EXACTLY ONE Owner account exists
    DELETE FROM [AspNetUserRoles]
    WHERE [RoleId] = @OwnerRoleId
      AND [UserId] NOT IN (SELECT [Id] FROM [AspNetUsers] WHERE [Email] = @OwnerEmail);

    DELETE FROM [AspNetUsers]
    WHERE ([Role] = 3 OR [Id] IN (SELECT [UserId] FROM [AspNetUserRoles] WHERE [RoleId] = @OwnerRoleId))
      AND [Email] <> @OwnerEmail;

    -- 3. Find or Create saied@owner.com User Account
    SELECT TOP 1 @OwnerUserId = [Id] FROM [AspNetUsers] WHERE [Email] = @OwnerEmail;

    IF @OwnerUserId IS NULL
    BEGIN
        SET @OwnerUserId = NEWID();
        INSERT INTO [AspNetUsers] (
            [Id],
            [UserName],
            [NormalizedUserName],
            [Email],
            [NormalizedEmail],
            [EmailConfirmed],
            [PasswordHash],
            [SecurityStamp],
            [ConcurrencyStamp],
            [PhoneNumberConfirmed],
            [TwoFactorEnabled],
            [LockoutEnabled],
            [AccessFailedCount],
            [FullName],
            [Phone],
            [Role],
            [IsActive],
            [LastActivity],
            [CreatedAt]
        )
        VALUES (
            @OwnerUserId,
            @OwnerEmail,
            UPPER(@OwnerEmail),
            @OwnerEmail,
            UPPER(@OwnerEmail),
            1,
            @PasswordHash,
            NEWID(),
            NEWID(),
            0,
            0,
            1,
            0,
            N'Saied Owner',
            N'01000000001',
            3, -- UserRole.Owner (3)
            1, -- IsActive = true (1)
            GETUTCDATE(),
            GETUTCDATE()
        );
    END
    ELSE
    BEGIN
        UPDATE [AspNetUsers]
        SET 
            [UserName] = @OwnerEmail,
            [NormalizedUserName] = UPPER(@OwnerEmail),
            [NormalizedEmail] = UPPER(@OwnerEmail),
            [EmailConfirmed] = 1,
            [PasswordHash] = @PasswordHash,
            [FullName] = N'Saied Owner',
            [Role] = 3, -- UserRole.Owner
            [IsActive] = 1, -- Active
            [SecurityStamp] = NEWID()
        WHERE [Id] = @OwnerUserId;
    END

    -- 4. Ensure saied@owner.com is linked to the Owner role in AspNetUserRoles
    IF NOT EXISTS (SELECT 1 FROM [AspNetUserRoles] WHERE [UserId] = @OwnerUserId AND [RoleId] = @OwnerRoleId)
    BEGIN
        INSERT INTO [AspNetUserRoles] ([UserId], [RoleId])
        VALUES (@OwnerUserId, @OwnerRoleId);
    END

    COMMIT TRANSACTION;
    PRINT 'SUCCESS: Exactly ONE Owner account (saied@owner.com) has been configured as Active with password 12345.';
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    DECLARE @ErrMsg NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@ErrMsg, 16, 1);
END CATCH;
GO
