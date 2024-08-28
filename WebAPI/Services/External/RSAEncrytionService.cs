using System.Security.Cryptography;
using System.Text;

namespace SoftKiwiFlorist.Services.External;

public class RSAEncryptionService
{
    public RSACryptoServiceProvider crypto = new RSACryptoServiceProvider(2048);
    private string? _publicKey;
    private string? _privateKey;
    private string _keyPath = Path.Combine(Directory.GetCurrentDirectory(), "keys");

    public void CreateKeyPair()
    {
        if (!Directory.Exists(_keyPath)) Directory.CreateDirectory(_keyPath);

        _privateKey = crypto.ToXmlString(true);
        _publicKey = crypto.ToXmlString(false);

        using var privateFile = File.Create(Path.Combine(_keyPath, "PrivateKey.xml"));
        using var publicFile = File.Create(Path.Combine(_keyPath, "PublicKey.xml"));

        privateFile.Write(Encoding.UTF8.GetBytes(_privateKey));
        publicFile.Write(Encoding.UTF8.GetBytes(_publicKey));
    }

    private RSACryptoServiceProvider? ReadKeyPair(string fileName)
    {
        string keyFile = Path.Combine(_keyPath, fileName);

        if (String.IsNullOrEmpty(keyFile)) return null;

        string xmlFile = File.ReadAllText(keyFile);
        
        crypto.FromXmlString(xmlFile);
        return crypto;
    }
    
    public RSACryptoServiceProvider? ReadPrivateKey()
    {
        return ReadKeyPair("PrivateKey.xml");
    }
    
    public RSACryptoServiceProvider? ReadPublicKey()
    {
        return ReadKeyPair("PublicKey.xml");
    }
}