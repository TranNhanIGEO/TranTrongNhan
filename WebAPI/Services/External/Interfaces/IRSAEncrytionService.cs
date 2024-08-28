using System.Security.Cryptography;

namespace SoftKiwiFlorist.Services.External.Interfaces;

public interface IRSAEncryptionService
{
    RSACryptoServiceProvider? CreateKeyPair();
    RSACryptoServiceProvider? ReadKeyPair();
}